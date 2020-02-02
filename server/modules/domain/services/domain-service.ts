import dbConnection = require('../../../core/db-connection')
import DomainModel = require('../models/domain-model')

var db = dbConnection();

class domainService {
    getList(id:number):Promise<any> {
        return db.query()
    }
}

export = domainService