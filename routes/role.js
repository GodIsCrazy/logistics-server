const tools = require('../api/index.js')
const express = require('express');
const router = express.Router();
const sysUserService = require('../service/SysUserService.js')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const tokenUtil = require('../util/tokenUtil.js')
const statusCode = require('../util/enum/statusCode.js')
const sysRoleService = require('../service/sysRoleService.js')
const sysUserDetailService = require('../service/SysUserDetailService.js')
const utils = require('../util/utils.js')
/* GET users listing. */


router.get('/roleListByPage', async function (req, res, next) {
  let query = req.query
  console.log(query)
  let resJson = {}
  try {
    let result = {}
    let data = await sysRoleService.getRoleListByPage(query)
    resJson.status = statusCode.SUCCESS.code;
    resJson.msg = statusCode.SUCCESS.description
    result.items = data
    result.recordCount = data.length
    result.currentPage = query.currentPage || 1
    result.pageSize = query.pageSize || 15
    resJson.result = result
  } catch (e) {
    console.log(e)
    resJson.status = statusCode.ERR.code;
    resJson.msg = statusCode.ERR.description
  } finally {
    res.json({
      ...resJson
    })
  }
})

router.post('/saveRole', async function (req, res, next) {
  let query = req.body
  console.log(query)
  let resJson = {}
  try {
    await sysRoleService.saveRole(query)
    resJson.status = statusCode.SUCCESS.code;
    resJson.msg = statusCode.SUCCESS.description
  } catch (e) {
    console.log(e)
    resJson.status = statusCode.ERR.code;
    resJson.msg = statusCode.ERR.description
  } finally {
    res.json({
      ...resJson
    })
  }
})

router.get('/getRoleList', async function (req, res, next) {
  let resJson = [];
  try {
    resJson.result = await sysRoleService.getRoleList();
    resJson.status = statusCode.SUCCESS.code;
    resJson.msg = statusCode.SUCCESS.description
  } catch (e) {
    console.log(e)
    resJson.status = statusCode.ERR.code;
    resJson.msg = statusCode.ERR.description
  } finally {
    res.json({
      ...resJson
    })
  }
})

module.exports = router;
