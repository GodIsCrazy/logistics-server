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


router.post('/addUser', function (req, res, next) {

});

function findOne () {

}





module.exports = router;
