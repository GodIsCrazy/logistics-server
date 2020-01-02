
// const Sequelize = require('sequelize')
const sequelize = require('../util/db.js')
const BaseService = require('./BaseService.js')
const SysRoleModel = require('../model/SysRoleModel.js')
const SysRoleMenuModel = require('../model/SysRoleMenuModel.js')
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
  /**
   * @description 得到角色的信息
   * @param {object} 参数  roleId
   */
  async getRoleDetailById (query) {
    try {
      let where = {
        sysRoleId: query.id
      }
      let result = utils.formatSqlResult(await SysRoleModel.findByFilter(query))[0]
      let menus = utils.formatSqlResult(await SysRoleMenuModel.findByFilter(where))
      result.menus = menus
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @description 删除角色
   * @param {object} 请求参数
   */
  async deleteRoleById (query) {
    try {
      let where = {
        id: query.id
      }
      await SysRoleModel.delete(where)
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  /* *
   * @descrtion 新增或修改角色信息
   */
  async saveRole (query) {
    let { roleId, menuIds, describe, name, role } = query
    let transaction = null
    let roleObj = {
      describe,
      name,
      role,
    }
    let where = {
      id: roleId
    }
    try {
      transaction = await sequelize.transaction() // 开启事务
      if (!roleId) { // 没传roles，默认为新增角色
        let roles = await SysRoleModel.model.create(roleObj, { transaction }) // 先插入一个角色,再往中间表插入数据
        roleId = roles.dataValues.id
        console.log(roles, '新增角色')
      } else {
        await SysRoleModel.model.update(roleObj, { where, transaction }) // 更新角色表的角色信息
      }
      // await SysRoleMenuModel.model.destroy({ sysRoleId: roleId }, { transaction }) // 删除权限菜单
      await SysRoleMenuModel.model.destroy({ where: { sysRoleId: roleId }, transaction }) // 删除权限菜单
      for (let i = 0; i < menuIds.length; i++) { // 遍历插入
        await SysRoleMenuModel.model.create({ sysMenuId: menuIds[i], sysRoleId: roleId }, { transaction })
      }
      transaction && transaction.commit() // 提交事务
      return true
    } catch (error) {
      console.log(error)
      transaction && transaction.rollback()
      return false
    } finally {

    }
  }
}

module.exports = new SysRoleService();
