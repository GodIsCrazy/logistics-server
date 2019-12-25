const tools = require('../api/index.js')
const express = require('express');
const router = express.Router();
const sysUserService = require('../service/SysUserService.js')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const tokenUtil = require('../util/tokenUtil.js')
const statusCode = require('../util/enum/statusCode.js')
const sysMenuService = require('../service/SysMenuService.js')
const utils = require('../util/utils.js')
/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.json({
    status: statusCode.INVALID_REQ.code,
    msg: statusCode.INVALID_REQ.description
  })
});

router.post('/login', async (req, res, next) => {
  let pass = req.body.userPwd;
  let user =utils.formatSqlResult(await sysUserService.baseFindByFilter({loginName: req.body.userName}));
  if(user.length>0){
    var userPwd = user[0].password;
    if (bcrypt.compare(pass, userPwd)) {
      let token = tokenUtil.createToken(user[0].userName, 60 * 60 * 24);
      let menu = await sysMenuService.getMenuListByUserId(user[0].id);
      console.log(menu)
      res.json({
        status: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.description,
        result: {
          userName: user[0].loginName,
          token: token,
          permissionMenuList: menu.status === 'C00001' ? menu.result.menuList : []
        }
      });
    }else {
      res.json({
        status: statusCode.ACCOUNT_ERROR.code,
        msg: statusCode.ACCOUNT_ERROR.description
      })
    }
  } else {
    res.json({
      status: statusCode.ACCOUNT_ERROR.code,
      msg: statusCode.ACCOUNT_ERROR.description
    })
  }

});



router.post('addUser', function (req, res, next) {

});

function findOne () {

}





module.exports = router;
