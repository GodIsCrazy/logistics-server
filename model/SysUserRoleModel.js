const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseModel = require('./BaseModel.js')
const DataTypes = Sequelize.DataTypes
class SysRoleModel extends BaseModel{
    constructor() {
        super('sys_user_role',{
            id:{type:Sequelize.STRING,defaultValue:DataTypes.UUIDV1,primaryKey:true},
            //可添加默认值方法 -- defaultValue:function(){ return ...}
            roleId:{type:Sequelize.STRING,filed: 'role_id'},
            userId:{type:Sequelize.STRING,field:'user_id'},
        });
        this.model = super.getModel()
        // this.model.sync({alter:true})
        this.model.sync({alter:true})
    }
}
/*new SysMenuModel().createBatch([
    {name:'用户管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/base/user',sort:1,icon:'md-settings'},
    {name:'系统管理',parentId:'41e76d00-26c5-11ea-b739-e910835ff1ce',path:'/sysSetting',sort:1,icon:'md-settings'}])*/
module.exports = new SysRoleModel()
