"use strict";
var loginLogModel = require('../models/loginlog-model');
var LoginLogService = (function () {
    function LoginLogService() {
    }
    LoginLogService.prototype.create = function (request) {
        return loginLogModel.model.create(request);
    };
    return LoginLogService;
}());
module.exports = LoginLogService;

//# sourceMappingURL=../../../source-maps/modules/logs/services/loginlog-service.js.map
