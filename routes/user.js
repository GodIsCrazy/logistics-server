const tools = require('../api/index.js')
const express = require('express');
const router = express.Router();
const sysUserService = require('../service/SysUserService.js')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const tokenUtil = require('../util/tokenUtil.js')
const statusCode = require('../util/enum/statusCode.js')
const sysMenuService = require('../service/SysMenuService.js')
const sysUserDetailService = require('../service/SysUserDetailService.js')
const utils = require('../util/utils.js')
/* GET users listing. */


router.get('/userInfo',async function(req,res,next) {
    try {
      let userId = req.query.userId;
      let menuList = await sysMenuService.getMenuListByUserId(userId)
      let userDetail = utils.formatSqlResult(await sysUserDetailService.baseFindByFilter({userId:userId}))
      res.json({
        status: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.description,
        result: {
          userDetail:userDetail,
          menuList: menuList,
          perssionBUtton:[]
          //permissionMenuList: menu.status === 'C00001' ? menu.result.menuList : []
        }
      })
    }catch (e) {
      console.log(e)
      res.json({
        status: statusCode.ERR.code,
        msg: statusCode.ERR.description
      })
    }
});

router.get('/userList',async function(req,res,next) {
  let query = req.query
  console.log(query)
  let resJson = [];
  try {
    resJson.result = await sysUserService.getUserBylikeName(query)
    resJson.status = statusCode.SUCCESS.code;
    resJson.msg = statusCode.SUCCESS.description
  }catch (e) {
    console.log(e)
    resJson.status = statusCode.ERR.code;
    resJson.msg = statusCode.ERR.description
  }finally {
    res.json({
      ...resJson
    })
  }
})

router.get('/getUserDetailById',async function(req,res,next) {
  let id = req.query.id
  let resJson = {};
  try {
    resJson.result = await sysUserService.getUserAndRoleById(id)
    resJson.status = statusCode.SUCCESS.code;
    resJson.msg = statusCode.SUCCESS.description
  }catch (e) {
    console.log(e)
    resJson.status = statusCode.ERR.code;
    resJson.msg = statusCode.ERR.description
  }finally {
    res.json({
      ...resJson
    })
  }
})


router.post('/saveUser', async function (req, res, next) {
  let user = req.body.user;
  let roleId = req.body.roleId;
  //初始密码123456
  let password = bcrypt.hashSync('123456',salt);
  user.password = password;
  let result = await sysUserService.saveUser(user,roleId);
  if (result){
    res.json({
      status: statusCode.SUCCESS.code,
      msg: statusCode.SUCCESS.description,
    })
  }else {
    res.json({
      status: statusCode.ERR.code,
      msg: statusCode.ERR.description,
    })
  }

});

router.get('/checkLoginName', async function (req, res, next) {
  let loginName = req.query.loginName;
  let result = utils.formatSqlResult(await sysUserService.baseFindByFilter({loginName:loginName}));

  if (result.length<=0){
    res.json({
      status: statusCode.SUCCESS.code,
      msg: statusCode.SUCCESS.description,
    })
  }else {
    res.json({
      status: statusCode.ERR.code,
      msg: statusCode.ERR.description,
    })
  }

});

router.get('/deleteUser', async function (req, res, next) {
  let id = req.query.id;
  let result = await sysUserService.deleteUser(id);
  if (result){
    res.json({
      status: statusCode.SUCCESS.code,
      msg: statusCode.SUCCESS.description,
    })
  }else {
    res.json({
      status: statusCode.ERR.code,
      msg: statusCode.ERR.description,
    })
  }


});

function findOne () {

}





module.exports = router;
