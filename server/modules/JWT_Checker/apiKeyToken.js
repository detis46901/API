"use strict";
var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    try {
        //this is just passing through right now.  The authorization is actually in the getsheets procedure.
        // const token = req.query.apikey
        //     const decoded_token = jwt.verify(token, environment.JWT_SECRET_KEY, {
        //         ignoreExpiration:false
        //     })
        //     req.loginJsonData = decoded_token
        // console.log(req.query.table)
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Authorization failed."
        });
    }
};

//# sourceMappingURL=../../source-maps/modules/JWT_Checker/apiKeyToken.js.map
