const SQL = require('../sql/index.js')
const db = require('../util/db.js')
const dbUtil = new db()
const statusCode = require('../util/enum/statusCode.js')
const utils = require('../util/utils.js')

module.exports = {
  getMenuList: async (loginName) => {
    try {
      let findRoleSql = SQL.ROLE.findRoleSql
      let result = await dbUtil.getReultBySql(findRoleSql, loginName)
      let result_menu = []
      if (result) {
        let findMenuSql = SQL.MENU.findMenuSql
        result_menu = await dbUtil.getReultBySql(findMenuSql, result[0].role_id)
      }
      return {
        status: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.description,
        result: {
          menuList: utils.formatMenu(result_menu)
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
