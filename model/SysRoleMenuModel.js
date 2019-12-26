const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseModel = require('./BaseModel.js')
const DataTypes = Sequelize.DataTypes
class SysRoleMenuModel extends BaseModel{
    constructor() {
        super('sys_role_menu',{
            id:{type:Sequelize.STRING,defaultValue:DataTypes.UUIDV1,primaryKey:true},
            //可添加默认值方法 -- defaultValue:function(){ return ...}
            sysRoleId:{type:Sequelize.STRING,field: 'role_id'},
            sysMenuId:{type:Sequelize.STRING,field: 'menu_id'},
        });
        this.model = super.getModel()
        // this.model.sync({alter:true})
        this.model.sync()
    }
}
/*new SysMenuModel().createBatch([
    {name:'用户管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/base/user',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'}])*/
module.exports = new SysRoleMenuModel()
