
var BaseService = require('./BaseService.js');
var SysRoleModel = require('../model/SysRoleModel.js')
class SysRoleService extends BaseService{
    constructor(){
        super(SysRoleModel)
    }
}

module.exports= new SysRoleService();
