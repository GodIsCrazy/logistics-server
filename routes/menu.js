var express = require('express');
var router = express.Router();
var sysMenuService = require('../service/SysMenuService.js')
var statusCode = require('../util/enum/statusCode.js')
const tools = require('../api/index.js')

//获取用户菜单权限
router.get('/menuList', async function (req, res, next) {
  var userId = req.query.userId;
  let data = await sysMenuService.getMenuListByUserId(userId)
  res.json({
    ...data
  })
});
router.post('/addMenu', async function (req, res, next) {
  var params = req.body;
  let result = await sysMenuService.baseCreate(params);
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })
})

router.post('/updateMenu', async function (req, res, next) {
  var params = req.body;
  var where = {id:params.id}
  let result = await sysMenuService.baseUpdate(params,where)
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })

})
router.get('/deleteMenu', async function (req, res, next) {
  var id = req.query.id;
  var where = {id:id}
  let result = await sysMenuService.baseDelete(where)
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })

})

module.exports = router;

