
const BaseService = require('./BaseService.js');
const SysUserRoleModel = require('../model/SysUserRoleModel.js')
class SysUserRoleService extends BaseService{
    constructor(){
        super(SysUserRoleService)
    }
}

module.exports= new SysUserRoleService();
