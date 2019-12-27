
const BaseService = require('./BaseService.js');
const SysRoleModel = require('../model/SysRoleModel.js')
const utils = require('../util/utils.js')
class SysRoleService extends BaseService{
    constructor(){
        super(SysRoleModel)
    }
    async getRoleList(){
        let result = await this.instance.findAll();
        return utils.formatSqlResult(result)
    }

}

module.exports= new SysRoleService();
