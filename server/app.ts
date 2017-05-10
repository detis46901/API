/// <reference path='_references.ts' />
import express = require('express');
import {urlencoded, json} from 'body-parser';
import errorHandler = require('errorhandler');
import cors = require('cors');
import {join} from 'path';
import AuthenticateController = require('./modules/users/controllers/authenticate-controller');
import GroupController = require ('./modules/users/controllers/group-controller')
import DepartmentController = require ('./modules/users/controllers/department-controller')
import RoleController = require ('./modules/users/controllers/role-controller')
import UsersController = require('./modules/users/controllers/users-controller');
import LayerAdminController = require('./modules/layers/controllers/layers-admin-controller');
import PageController = require('./modules/users/controllers/page-controller');
import UserPageLayerController = require('./modules/layers/controllers/user-page-layer-controller');
import LayerPermissionController = require('./modules/layers/controllers/layers-permission-controller');


var app = express();

// Configuration

app.set('port', 5000);
app.set('views', join( __dirname, '/views') ); // critical to use path.join on windows
app.set('view engine', 'vash');
app.set('view options', { layout: false });
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(express.static(join(__dirname, '/../client')));
app.use(errorHandler());

// Routes
app.use('/api/users', UsersController);
app.use('/api/authenticate', AuthenticateController)
app.use('/api/department', DepartmentController)
app.use('/api/group', GroupController)
app.use('/api/role', RoleController)
app.use('/api/layeradmin', LayerAdminController);
app.use('/api/layerpermission', LayerPermissionController);
app.use('/api/userpagelayer', UserPageLayerController);
app.use('/api/userpage', PageController);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

export var App = app;


//import http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(1337, '127.0.0.1');

//console.log('Server running at http://127.0.0.1:1337/');