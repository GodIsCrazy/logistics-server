const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseService = require('./BaseService.js');
const SysMenuModel = require('../model/SysMenuModel.js')
const utils = require('../util/utils.js')
const statusCode = require('../util/enum/statusCode.js')
class SysMenuService extends BaseService{
    constructor(){
        super(SysMenuModel)
    }
    async getMenuListByUserId(id){
        try {
            let roleId = await sequelize.query('select role_id from sys_user_role where user_id = ? ',
                { replacements: [id], type: Sequelize.QueryTypes.SELECT });
            if(roleId.length>0){
                let menuList =await sequelize.query('select m.* from sys_menu m left join sys_role_menu rm on rm.menu_id = m.id where rm.role_id = ? ',
                    { replacements: [roleId[0].role_id], type: Sequelize.QueryTypes.SELECT });
                return {
                    status: statusCode.SUCCESS.code,
                    msg: statusCode.SUCCESS.description,
                    result: {
                        menuList: utils.formatMenu(menuList)
                    }
                }
            }else{
                return {
                    status: statusCode.FAILED.code,
                    msg: statusCode.FAILED.description
                }
            }

        } catch (error) {
            console.log(error)
            return {
                status: statusCode.FAILED.code,
                msg: statusCode.FAILED.description
            }
        }

    }
}

module.exports= new SysMenuService();
