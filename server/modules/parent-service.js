var Model;
var Instance;
var ParentService = (function () {
    function ParentService() {
    }
    ParentService.prototype.get = function (rowID) {
        return Model.findById(rowID);
    };
    ParentService.prototype.create = function (request) {
        return Model.create(request);
    };
    ParentService.prototype.delete = function (ID) {
        return Model.findById(ID).then(function (Instance) {
            return Instance.destroy();
        });
    };
    return ParentService;
}());

//# sourceMappingURL=../source-maps/modules/parent-service.js.map
