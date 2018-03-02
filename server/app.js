"use strict";
/// <reference path='_references.ts' />
var express = require('express');
var body_parser_1 = require('body-parser');
var errorHandler = require('errorhandler');
var cors = require('cors');
var path_1 = require('path');
var AuthenticateController = require('./modules/users/controllers/authenticate-controller');
var GroupController = require('./modules/users/controllers/group-controller');
var UserController = require('./modules/users/controllers/user-controller');
var GroupMemberController = require('./modules/users/controllers/group-member-controller');
var NotificationController = require('./modules/users/controllers/notification-controller');
var LayerController = require('./modules/layers/controllers/layers-controller');
var PageController = require('./modules/users/controllers/page-controller');
var UserPageLayerController = require('./modules/layers/controllers/user-page-layer-controller');
var LayerPermissionController = require('./modules/layers/controllers/layers-permission-controller');
var ServerController = require('./modules/layers/controllers/servers-controller');
var SQLController = require('./modules/postGIS_layers/controllers/sql-controller');
var geoJSONController = require('./modules/postGIS_layers/controllers/geoJSON-controller');
var app = express();
// Configuration
app.set('port', 5000);
app.set('views', path_1.join(__dirname, '/views')); // critical to use path.join on windows
app.set('view engine', 'vash');
app.set('view options', { layout: false });
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
app.use(cors());
app.use(express.static(path_1.join(__dirname, '/../client')));
app.use(errorHandler());
// Routes
//app.use('/api/parent', ParentController);
app.use('/api/users', UserController);
app.use('/api/layer', LayerController);
app.use('/api/authenticate', AuthenticateController);
app.use('/api/group', GroupController);
app.use('/api/groupmember', GroupMemberController);
app.use('/api/notification', NotificationController);
app.use('/api/layerpermission', LayerPermissionController);
app.use('/api/userpagelayer', UserPageLayerController);
app.use('/api/userpage', PageController);
app.use('/api/server', ServerController);
app.use('/api/sql', SQLController);
app.use('/api/geojson', geoJSONController);
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
exports.App = app;
//import http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(1337, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:1337/'); 

//# sourceMappingURL=source-maps/app.js.map
