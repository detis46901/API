"use strict";
var dbConnection = require('../../../core/db-connection');
var db = dbConnection();
var domainService = (function () {
    function domainService() {
    }
    domainService.prototype.getList = function (id) {
        return db.query();
    };
    return domainService;
}());
module.exports = domainService;

//# sourceMappingURL=../../../source-maps/modules/domain/services/domain-service.js.map
