
const BaseService = require('./BaseService.js');
const SysUserDetailModel = require('../model/SysUserDetailModel.js')
class SysUserDetailService extends BaseService{
    constructor(){
        super(SysUserDetailModel)
    }
}

module.exports= new SysUserDetailService();
