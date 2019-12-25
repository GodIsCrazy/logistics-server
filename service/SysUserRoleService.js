
var BaseService = require('./BaseService.js');
var SysUserRoleModel = require('../model/SysUserRoleModel.js')
class SysUserRoleService extends BaseService{
    constructor(){
        super(SysUserRoleService)
    }
}

module.exports= new SysUserRoleService();
