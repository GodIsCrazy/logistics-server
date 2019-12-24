module.exports = {
  ROLE: {
    findRoleSql: 'select ur.role_id  from sys_user_role ur left join sys_user u on u.id = ur.user_id  where 1=1 and u.login_name = ? '
  },
  MENU: {
    findMenuSql: 'select m.* from sys_menu m left join sys_role_menu rm on rm.menu_id = m.id where rm.role_id = ? '
  }
}
