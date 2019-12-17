var express = require('express');
var router = express.Router();
var db=require('../mysql.js');
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
var tokenUtil =require('../util/tokenUtil.js')
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render("layout")

});

router.get('/list', function(req, res, next) {
  console.log("test！！！")
  res.render("layout")

});

/* GET users listing. */
router.post('/login', function(req, res, next) {
  // res.send('respond with a resource');
  // 查询实例
  console.log(111111111111)
// 获取参数
  var param = [, ];
  var pass = req.body.userPwd;
  var findOneSql = 'select * from sys_user where login_name = ? ';
  db.query(findOneSql, req.body.userName,function(result,fields){
    if(result.length>0){
      var userPwd = result[0].password;
      if(bcrypt.compare(pass, userPwd)){
        var token = tokenUtil.createToken(result[0].user_name,60*30);
        console.log(token)
        res.json({
          status:"0",
          msg:'',
          result:{
            userName:result[0].user_name,
            token:token
          }
        });
      }else{
        res.json({
          status:"1",
          msg:'账号名或密码错误！'
        })
      }

    }else{
      res.json({
        status:"1",
        msg:'账号名或密码错误！'
      })
    }

  });

});

function findOne(){

}





module.exports = router;
