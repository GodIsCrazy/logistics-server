module.exports = {
  /**
   * @author luorongsheng
   * @description 格式化菜单数据
   * @param {Array} menuList 数据查询出来的数据
   * @param {String} parentId 父节点id
   * @returns {Array}
   *
   *  */
  formatMenu (menuList, parentId) {
    if (menuList.length > 0) {
      if (parentId) { // 筛选子菜单
        return menuList.filter(res => res.parentId === parentId)
      } else {
        let firstMenu = menuList.filter(res => !res.parentId)
        // console.log(firstMenu, '父菜单')
        let menu = firstMenu.map(menuItem => {
          console.log(menuItem)
          let children = this.formatMenu(menuList, menuItem.id)
          menuItem.children = children
          return menuItem
        })
        // console.log(menu, '菜单')
        return menu
      }
    }
    return []
  },
  formatSqlResult (result) {
    if (result.length > 0) {
      let resultArr = [];
      for (let i = 0; i < result.length; i++) {
        resultArr[i] = result[i].dataValues;
      }
      return resultArr;
    } else {
      return []
    }
  }
}
