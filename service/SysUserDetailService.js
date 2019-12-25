
var BaseService = require('./BaseService.js');
var SysUserDetailModel = require('../model/SysUserDetailModel.js')
class SysUserDetailService extends BaseService{
    constructor(){
        super(SysUserDetailModel)
    }
}

module.exports= new SysUserDetailService();
