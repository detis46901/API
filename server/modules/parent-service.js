var Model;
var Instance;
var ParentService = (function () {
    function ParentService() {
    }
    ParentService.prototype.get = function (rowID) {
        return Model.findByPk(rowID);
    };
    ParentService.prototype.create = function (request) {
        return Model.create(request);
    };
    ParentService.prototype.delete = function (ID) {
        return Model.findByPk(ID).then(function (Instance) {
            return Instance.destroy();
        });
    };
    return ParentService;
}());

//# sourceMappingURL=../source-maps/modules/parent-service.js.map
