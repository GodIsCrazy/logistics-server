const Sequelize = require('sequelize');
var sequelize = require('../util/db.js');
var BaseModel = require('./BaseModel.js')
var DataTypes = Sequelize.DataTypes
class SysMenuModel extends BaseModel{
    constructor() {
        super('sys_menu',{
            id:{type:Sequelize.STRING,defaultValue:DataTypes.UUIDV1,primaryKey:true},
            //可添加默认值方法 -- defaultValue:function(){ return ...}
            name:{type:Sequelize.STRING},
            parentId:{type:Sequelize.STRING,field:'parent_id'},
            path:{type:Sequelize.STRING},
            sort:{type:Sequelize.INTEGER(4)},
            remark:{type:Sequelize.STRING},
            icon:{type:Sequelize.STRING}
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
module.exports = new SysMenuModel()
