const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseService = require('./BaseService.js');
const SysMenuModel = require('../model/SysMenuModel.js')
const utils = require('../util/utils.js')
const statusCode = require('../util/enum/statusCode.js')
const Op = Sequelize.Op;
class SysMenuService extends BaseService {
  constructor() {
    super(SysMenuModel)
  }
  async getMenuListByUserId (id) {
    let roleId = await sequelize.query('select role_id from sys_user_role where user_id = ? ',
      { replacements: [id], type: Sequelize.QueryTypes.SELECT });
    if (roleId.length > 0) {
      let menuList = await sequelize.query('select m.* from sys_menu m left join sys_role_menu rm on rm.menu_id = m.id where rm.role_id = ? ',
        { replacements: [roleId[0].role_id], type: Sequelize.QueryTypes.SELECT });
      return utils.formatMenu(menuList)
    } else {
      return []
    }
  }

  async getMenuBylikeNameOrPath ({ pageSize, currentPage, keyword }) {
    let where = {}
    if (keyword) {
      where[Op.or] = { name: { [Op.like]: '%' + keyword + '%' }, path: { [Op.like]: '%' + keyword + '%' } }
    }
    let result = await SysMenuModel.findByPageFilter(pageSize, currentPage, where);
    return {
      items: utils.formatMenu(utils.formatSqlResult(result.rows)),
      currentPage: parseInt(currentPage || 1),
      pageSize: parseInt(pageSize || 15),
      recordCount: result.rows.length
    }
  }
}
/*new SysMenuService().getMenuBylikeNameOrPath(3,1,'')
async function test(){
    let result = await new SysMenuService().getMenuBylikeNameOrPath(3,1,'user')
    let rows =await utils.formatSqlResult(result);  //result.rows[0].dataValues
    console.log(rows)
}
test()*/
module.exports = new SysMenuService();
