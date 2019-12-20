var express = require('express');
var router = express.Router();
var db=require('../mysql.js');
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
var tokenUtil =require('../util/tokenUtil.js')
var statusCode = require('../util/enum/statusCode.js')




router.post('/menuList', async function(req, res, next) {

  var loginName = req.body.userName;
  var findRoleSql = 'select ur.role_id  from sys_user_role ur left join sys_user u on u.id = ur.user_id  where 1=1 and u.login_name = ? ';
  let result = await getRoleId(findRoleSql,loginName)
  if(result){
    var findMenuSql = 'select m.* from sys_menu m left join sys_role_menu rm on rm.menu_id = m.id where rm.role_id = ? ';
    db.query(findMenuSql, result[0].role_id,function(result,fields){
      res.json({
        status:statusCode.SUCCESS.code,
        msg:statusCode.SUCCESS.description,
        result:{
          menuList : result
        }
      });
    })
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


function getRoleId(sql,loginName){
  return new Promise((resolve,reject) => {
    db.query(sql,loginName,function (result,fields) {
      if (result.length > 0) {
        resolve(result)
      }else{
        resolve(false)
      }
    })
  })
}
module.exports = router;

