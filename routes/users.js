var express = require('express');
var router = express.Router();
var db=require('../mysql.js');
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
var tokenUtil =require('../util/tokenUtil.js')
var statusCode = require('../util/enum/statusCode.js')
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.json({
    status:statusCode.INVALID_REQ.code,
    msg:statusCode.INVALID_REQ.description
  })
});



router.post('/login', function(req, res, next) {
  var pass = req.body.userPwd;
  var findOneSql = 'select * from sys_user where login_name = ? ';
  db.query(findOneSql, req.body.userName,function(result,fields){
    if(result.length>0){
      var userPwd = result[0].password;
      if(bcrypt.compare(pass, userPwd)){
        var token = tokenUtil.createToken(result[0].user_name,60*30);
        console.log(token)
        res.json({
          status:statusCode.SUCCESS.code,
          msg:statusCode.SUCCESS.description,
          result:{
            userName:result[0].login_name,
            token:token
          }
        });
      }else{
        res.json({
          status:statusCode.ACCOUNT_ERROR.code,
          msg:statusCode.ACCOUNT_ERROR.description
        })
      }

    }else{
      res.json({
        status:statusCode.ACCOUNT_ERROR.code,
        msg:statusCode.ACCOUNT_ERROR.description
      })
    }

  });

});

router.post('addUser',function (req,res,next) {

});

function findOne(){

}





module.exports = router;
