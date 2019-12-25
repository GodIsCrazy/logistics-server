
var BaseService = require('./BaseService.js');
var SysUserModel = require('../model/SysUserModel.js')
class SysUserService extends BaseService{
    constructor(){
        super(SysUserModel)
    }
}

module.exports= new SysUserService();
