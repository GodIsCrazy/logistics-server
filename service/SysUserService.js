
const BaseService = require('./BaseService.js');
const SysUserModel = require('../model/SysUserModel.js')
class SysUserService extends BaseService{
    constructor(){
        super(SysUserModel)
    }
}

module.exports= new SysUserService();
