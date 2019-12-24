var express = require('express');
var router = express.Router();
var dbUtil = require('../util/db.js');
var statusCode = require('../util/enum/statusCode.js')
const tools = require('../api/index.js')

//获取用户菜单权限
router.get('/menuList', async function (req, res, next) {
  var loginName = req.query.userName;
  let data = await tools.getMenuList(loginName)
  res.json({
    ...data
  })
});
router.post('/addMenu', async function (req, res, next) {
  var params = req.body;
  let result = await dbUtil.insertSql('sys_menu', params);
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })
})

router.post('/updateMenu', async function (req, res, next) {
  var params = req.body;
  var whereSql = '1 = 1 and id = ' + req.body.id;
  let result = await dbUtil.updateSql('sys_menu', params, whereSql);
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })

})
router.get('/deleteMenu', async function (req, res, next) {
  var id = req.query.id;
  var whereSql = '1 = 1 and id = ' + id;
  let result = await dbUtil.deleteSql('sys_menu', whereSql);
  res.json({
    status: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.description
  })

})

module.exports = router;

