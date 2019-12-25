
const BaseService = require('./BaseService.js');
const SysRoleModel = require('../model/SysRoleModel.js')
class SysRoleService extends BaseService{
    constructor(){
        super(SysRoleModel)
    }
}

module.exports= new SysRoleService();
