var express = require('express');
var router = express.Router();
var db=require('../mysql.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

/* GET users listing. */
router.post('/login', function(req, res, next) {
  // res.send('respond with a resource');
  // 查询实例

// 获取参数
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  console.log(req.body);
  var findOneSql = 'select * from t_user where user_name = ? and user_pwd=?';
  db.query('select * from t_user', param,function(result,fields){
    if(result){
      res.cookie("userId",result.userId,{
        path:'/',
        maxAge:100*60*60
      });
      res.json({
        status:"0",
        msg:'',
        result:{
          userName:result.userName
        }
      })
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
