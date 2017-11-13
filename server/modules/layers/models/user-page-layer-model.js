"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var PageModel = require('../../users/models/page-model');
var LayerAdminModel = require('./layers-admin-model');
var UserModel = require('../../users/models/users-model');
var db = dbConnection();
var sequalizeModel = db.define('user_page_layer', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    layerON: {
        type: Sequelize.BOOLEAN,
    }
});
sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(PageModel.Model);
sequalizeModel.belongsTo(LayerAdminModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/user-page-layer-model.js.map
