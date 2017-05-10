"use strict";
var DepartmentModel = require('../models/department-model');
var DepartmentService = (function () {
    function DepartmentService() {
    }
    DepartmentService.prototype.getList = function (searchValue) {
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
        return DepartmentModel.Model.findAll(findOptions);
    };
    DepartmentService.prototype.get = function (rowID) {
        return DepartmentModel.Model.findById(rowID);
    };
    DepartmentService.prototype.create = function (request) {
        console.log('At Create Request');
        return DepartmentModel.Model.create(request);
    };
    DepartmentService.prototype.update = function (request) {
        return (DepartmentModel.Model.findById(request.ID).then(function (DepartmentInstance) {
            DepartmentInstance.department = request.department;
            DepartmentInstance.active = request.active;
            return DepartmentInstance.save();
        }));
    };
    DepartmentService.prototype.delete = function (rowID) {
        return DepartmentModel.Model.findById(rowID).then(function (DepartmentInstance) {
            return DepartmentInstance.destroy();
        });
    };
    return DepartmentService;
}());
module.exports = DepartmentService;

//# sourceMappingURL=../../../source-maps/modules/users/services/department-service.js.map
