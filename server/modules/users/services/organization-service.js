"use strict";
var DepartmentModel = require('../models/organization-model');
var OrganizationService = (function () {
    function OrganizationService() {
    }
    OrganizationService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'department'
            ]
        };
        if (searchValue) {
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: "%" + searchValue + "%" } },
                    { lastName: { $iLike: "%" + searchValue + "%" } },
                    { email: { $iLike: "%" + searchValue + "%" } },
                ]
            };
        }
        return DepartmentModel.dModel.findAll(findOptions);
    };
    OrganizationService.prototype.get = function (rowID) {
        return DepartmentModel.dModel.findById(rowID);
    };
    OrganizationService.prototype.create = function (request) {
        console.log('At Create Request');
        return DepartmentModel.dModel.create(request);
    };
    OrganizationService.prototype.update = function (request) {
        return (DepartmentModel.dModel.findById(request.ID).then(function (DepartmentInstance) {
            DepartmentInstance.department = request.department;
            DepartmentInstance.active = request.active;
            return DepartmentInstance.save();
        }));
    };
    OrganizationService.prototype.delete = function (rowID) {
        return DepartmentModel.dModel.findById(rowID).then(function (DepartmentInstance) {
            return DepartmentInstance.destroy();
        });
    };
    return OrganizationService;
}());

//# sourceMappingURL=../../../source-maps/modules/users/services/organization-service.js.map
