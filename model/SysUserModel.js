const Sequelize = require('sequelize');
var sequelize = require('../util/db.js');
var BaseModel = require('./BaseModel.js')
var DataTypes = Sequelize.DataTypes
class SysUserModel extends BaseModel{
    constructor() {
        super('sys_user',{
            id:{type:Sequelize.STRING,defaultValue:DataTypes.UUIDV1,primaryKey:true},
            //可添加默认值方法 -- defaultValue:function(){ return ...}
            name:{type:Sequelize.STRING},
            loginName:{type:Sequelize.STRING,field:'login_name'},
            password:{type:Sequelize.STRING},
            email:{type:Sequelize.STRING},
            userType:{type:Sequelize.STRING,defaultValue:0,field:'user_type'},
            isDelet:{type:Sequelize.STRING,defaultValue: 'false',field:'is_delete'}
        });
        this.model = super.getModel()
        this.model.sync({alter:true})
    }
}

/*
async function test() {
   var result= await new SysUserModel().findByFilter({loginName: '测试'});
    console.log(result)
}
test()*/
module.exports = new SysUserModel()
