"use strict";
var dbConnection = require('../../../core/db-connection');
var PageModel = require('../../users/models/page-model');
var LayerModel = require('./layers-model');
var UserModel = require('../../users/models/user-model');
var UserPageInstanceModel = require('../../feature modules/models/user-page-instance-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('user_page_layer', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: sequelize_1.DataTypes.BOOLEAN },
    layerOrder: {
        type: sequelize_1.DataTypes.INTEGER },
    style: {
        type: sequelize_1.DataTypes.JSON }
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(PageModel.model);
sequalizeModel.belongsTo(LayerModel.model);
sequalizeModel.belongsTo(UserPageInstanceModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/user-page-layer-model.js.map
