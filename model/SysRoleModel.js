const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseModel = require('./BaseModel.js')
const SysMenuModel = require('./SysMenuModel.js')
const SysRoleMenuModel = require('./SysRoleMenuModel.js')
const DataTypes = Sequelize.DataTypes
class SysRoleModel extends BaseModel{
    constructor() {
        super('sys_role',{
            id:{type:Sequelize.STRING,defaultValue:DataTypes.UUIDV1,primaryKey:true},
            //可添加默认值方法 -- defaultValue:function(){ return ...}
            role:{type:Sequelize.STRING},
            name:{type:Sequelize.STRING},
            modules:{type:Sequelize.STRING},
            describe:{type:Sequelize.STRING}
        });
        this.model = super.getModel()
        // this.model.sync({alter:true})
        this.model.sync()
    }
    getBelongToMany(){
        this.model.belongsToMany(SysMenuModel.model,{through:SysRoleMenuModel.model})
    }
}
/*new SysMenuModel().createBatch([
    {name:'用户管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/base/user',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'}])*/
module.exports = new SysRoleModel()
