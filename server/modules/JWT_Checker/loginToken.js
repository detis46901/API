"use strict";
var _this = this;
var jwt = require('jsonwebtoken');
var environment_1 = require('../../core/environment');
module.exports = function (req, res, next) {
    try {
        if (req.query.apikey) {
            var token = req.query.apikey;
            var decoded_token = jwt.verify(token, environment_1.environment.JWT_SECRET_KEY, {
                ignoreExpiration: false
            });
            req.loginJsonData = decoded_token;
        }
        else {
            var token = req.headers.authorization.split(" ")[1]; //Remove "Bearer " from auth header in request
            var decoded_token = jwt.verify(token, environment_1.environment.JWT_SECRET_KEY, {
                ignoreExpiration: false
            });
            req.loginJsonData = decoded_token;
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: _this.token
        });
    }
};

//# sourceMappingURL=../../source-maps/modules/JWT_Checker/loginToken.js.map
