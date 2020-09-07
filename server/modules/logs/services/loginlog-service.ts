import Sequelize = require('sequelize');
import loginLogModel = require('../models/loginlog-model');

class LoginLogService {

    create(request: App.LoginLog): Promise<loginLogModel.LoginLogInstance> { 
        return loginLogModel.model.create(request);
    }

}

export = LoginLogService;