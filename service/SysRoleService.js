
const BaseService = require('./BaseService.js');
const SysRoleModel = require('../model/SysRoleModel.js')
const utils = require('../util/utils.js')
class SysRoleService extends BaseService {
  constructor() {
    super(SysRoleModel)
  }
  async getRoleList () {
    let result = await this.instance.findAll();
    return utils.formatSqlResult(result)
  }
  async getRoleListByPage (query) {
    let { pageSize, currentPage } = query
    delete query.pageSize
    delete query.currentPage
    let where = query
    let result = await SysRoleModel.findByPageFilter(pageSize || 15, currentPage || 1, where)
    return utils.formatSqlResult(result.rows)
  }
  // async saveRole (query) {
  //   try {
  //     return await sequelize.transaction().then(function (transaction) {
  //       return SysUserModel.model.create(user, { transaction }).then(function (user) {
  //         let userId = user.dataValues.id;
  //         return SysUserRoleModel.model.create(
  //           { userId: userId, roleId: roleId }, { transaction })
  //           .then(() => {
  //             transaction.commit()
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             transaction.rollback()
  //           })
  //       });
  //     }).then(function (result) {
  //       return true
  //     }).catch(function (err) {
  //       console.log(err)
  //       return false
  //     });
  //   } catch (e) {
  //     console.log(e)
  //     return false
  //   }


  // }
}

module.exports = new SysRoleService();
