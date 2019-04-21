"use strict";
var jwt = require('jsonwebtoken');
var environment_1 = require('../../core/environment');
module.exports = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
        var decoded_token = jwt.verify(token, environment_1.environment.JWT_SECRET_KEY, {
            ignoreExpiration: false
        }); //jwt.verify() does jwt.decode() and verifies signature afterwards.
        req.loginToken = decoded_token;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Authorization failed."
        });
    }
};

//# sourceMappingURL=../../source-maps/modules/JWT_Checker/apiKeyToken.js.map
