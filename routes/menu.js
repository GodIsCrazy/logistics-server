var express = require('express');
var router = express.Router();
var dbUtil=require('../util/dbUtil.js');
var statusCode = require('../util/enum/statusCode.js')

//获取用户菜单权限
router.post('/menuList', async function(req, res, next) {
  var loginName = req.body.userName;
  var findRoleSql = 'select ur.role_id  from sys_user_role ur left join sys_user u on u.id = ur.user_id  where 1=1 and u.login_name = ? ';
  let result = await dbUtil.getReultBySql(findRoleSql,loginName);
  if(result){
    var findMenuSql = 'select m.* from sys_menu m left join sys_role_menu rm on rm.menu_id = m.id where rm.role_id = ? ';
    let result_menu =await dbUtil.getReultBySql(findMenuSql,result[0].role_id);
    res.json({
      status:statusCode.SUCCESS.code,
      msg:statusCode.SUCCESS.description,
      result:{
        menuList : result_menu
      }
    });
  }else{
    res.json({
      status:statusCode.SUCCESS.code,
      msg:statusCode.SUCCESS.description,
      result:{
        menuList : []
      }
    });
  }
});
router.post('/addMenu',async function (req,res,next) {
  var params = req.body;
  let result =await dbUtil.insertSql('sys_menu',params);
  res.json({
    status:statusCode.SUCCESS.code,
    msg:statusCode.SUCCESS.description
  })
})

router.post('/updateMenu',async function (req,res,next) {
  var params = req.body;
  var whereSql = '1 = 1 and id = '+req.body.id;
  let result =await dbUtil.updateSql('sys_menu',params,whereSql);
  res.json({
    status:statusCode.SUCCESS.code,
    msg:statusCode.SUCCESS.description
  })

})
router.get('/deleteMenu',async function (req,res,next) {
  var id = req.query.id;
  var whereSql = '1 = 1 and id = '+id;
  let result =await dbUtil.deleteSql('sys_menu',whereSql);
  res.json({
    status:statusCode.SUCCESS.code,
    msg:statusCode.SUCCESS.description
  })

})

module.exports = router;

