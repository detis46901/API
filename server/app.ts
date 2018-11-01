/// <reference path='_references.ts' />
import * as express from 'express'
import { createServer, Server } from 'http'
import * as socketIo from 'socket.io';
import {urlencoded, json} from 'body-parser';
import errorHandler = require('errorhandler');
import cors = require('cors');
import {join} from 'path';
import ParentController = require('./modules/parent-controller');
import AuthenticateController = require('./modules/users/controllers/authenticate-controller');
import GroupController = require ('./modules/users/controllers/group-controller');
import UserController = require('./modules/users/controllers/user-controller');
import GroupMemberController = require('./modules/users/controllers/group-member-controller');
import NotificationController = require('./modules/users/controllers/notification-controller');
import LayerController = require('./modules/layers/controllers/layers-controller');
import PageController = require('./modules/users/controllers/page-controller');
import UserPageLayerController = require('./modules/layers/controllers/user-page-layer-controller');
import LayerPermissionController = require('./modules/layers/controllers/layers-permission-controller');
import ServerController = require('./modules/layers/controllers/servers-controller');
import SQLController = require('./modules/postGIS_layers/controllers/sql-controller');
import geoJSONController = require('./modules/postGIS_layers/controllers/geoJSON-controller');
import { Socket, SocketOptions } from 'dgram';
//import { ChatServer} from './chat-server'
require('events').EventEmitter.defaultMaxListeners = 15;


var app = express();
let server: Server
let io: socketIo.Server
// var allowedOrigins = "http://localhost:*";


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
//app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
//app.use(cors({credentials: true, origin: 'http://a.cityofkokomo.org'}));

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
this.server = createServer(this.app)
//this.io = socketIo(this.server)
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//let socketApp = new ChatServer().getApp()
export var App = app;



// //import http = require('http');
// //http.createServer(function (req, res) {
// //    res.writeHead(200, { 'Content-Type': 'text/plain' });
// //    res.end('Hello World\n');
// //}).listen(1337, '127.0.0.1');

// //console.log('Server running at http://127.0.0.1:1337/');