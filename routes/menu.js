var express = require('express');
var router = express.Router();
var sysMenuService = require('../service/SysMenuService.js')
var statusCode = require('../util/enum/statusCode.js')
const tools = require('../api/index.js')
const utils = require('../util/utils.js')

//获取用户菜单权限
router.get('/menuList', async function (req, res, next) {
  let query = req.query
  let data = await sysMenuService.getMenuBylikeNameOrPath(query)
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description,
    result: {
      ...data
    }
  })
});
/* 已经弃用 */
router.post('/addMenu', async function (req, res, next) {
  var params = req.body;
  let result = await sysMenuService.baseCreate(params);
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })
})
/* 菜单的新增&修改 */
router.post('/saveMenu', async function (req, res, next) {
  let params = req.body;
  let result = []
  if (params.id) { // 传id为修改
    var where = { id: params.id }
    result = await sysMenuService.baseUpdate(params, where)
  } else {
    result = await sysMenuService.baseCreate(params);
  }

  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })

})
/* 删除菜单 */
router.get('/deleteMenu', async function (req, res, next) {
  let data = {}
  try {
    const id = req.query.id
    let where = { id: id }
    let deleteWhere = { parentId: id }
    let result = null
    let sonMenus = await sysMenuService.baseFindByFilter(deleteWhere)
    if (sonMenus.length <= 0) {
      result = await sysMenuService.baseDelete(where)
      data.status = statusCode.SUCCESS.code
      data.msg = statusCode.SUCCESS.description
      data.result = result
    }
    throw ("存在子菜单，不能删除")
  } catch (error) {
    data.status = statusCode.FAILED.code
    data.msg = error
  } finally {
    res.json({
      ...data
    })
  }
})
/* *
 * 获取一级菜单
  */
router.get('/getFirstMenu', async (req, res, next) => {
  let status = ''
  let msg = ''
  let result = []
  try {
    result = await sysMenuService.getFirstMenu()
    status = statusCode.SUCCESS.code,
      msg = statusCode.SUCCESS.description
  } catch (error) {
    status = statusCode.FAILED.code,
      msg = statusCode.FAILED.description
  } finally {
    res.json({
      status,
      msg,
      result
    })
  }
})
/* 根据菜单id获取菜单信息 */
router.get('/getMenuDetailById', async (req, res, next) => {
  let status = ''
  let msg = ''
  let result = []
  let where = {
    id: req.query && req.query.id
  }
  try {
    result = utils.formatSqlResult(await sysMenuService.baseFindByFilter(where))[0]
    status = statusCode.SUCCESS.code
    msg = statusCode.SUCCESS.description
    console.log(result)
  } catch (error) {
    console.log(error)
    status = statusCode.FAILED.code
    msg = statusCode.FAILED.description
    result = error
  } finally {
    res.json({
      status,
      msg,
      result
    })
  }
})

/* *
 * 获取一级菜单
  */
router.get('/AllMenuList', async (req, res, next) => {
  let status = ''
  let msg = ''
  let result = []
  try {
    result = await sysMenuService.getAllMenu()
    status = statusCode.SUCCESS.code,
      msg = statusCode.SUCCESS.description
  } catch (error) {
    status = statusCode.FAILED.code,
      msg = statusCode.FAILED.description
  } finally {
    res.json({
      status,
      msg,
      result
    })
  }
})

module.exports = router;

