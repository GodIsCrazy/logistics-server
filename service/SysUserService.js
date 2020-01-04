const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');
const BaseService = require('./BaseService.js');
const SysUserModel = require('../model/SysUserModel.js')
const SysRoleModel = require('../model/SysRoleModel.js')
const SysUserRoleModel = require('../model/SysUserRoleModel.js')
const utils = require('../util/utils.js')
const Op = Sequelize.Op;
class SysUserService extends BaseService{
    constructor(){
        super(SysUserModel)
    }

    async getUserBylikeName ({ pageSize, currentPage, name }) {
        let where = {}
        if (name) {
            where[Op.or] = { name: { [Op.like]: '%' + name + '%' }, loginName: { [Op.like]: '%' + name + '%' } }
        }
        let result = await SysUserModel.findByPageFilter(pageSize, currentPage, where);
        return {
            items: utils.formatSqlResult(result.rows),
            currentPage: parseInt(currentPage || 1),
            pageSize: parseInt(pageSize || 15),
            recordCount: result.rows.length
        }
    }

    async getRoleByUserId(userId){
        this.instance.setBelongToMany(SysRoleModel.model, SysUserRoleModel.model)
        SysRoleModel.setBelongToMany(this.instance.model, SysUserRoleModel.model)
        let result = await SysRoleModel.model.findAll({
            include: [{
                model: this.instance.model,
                where: { id: userId },
                attributes: []
            }],
            includeIgnoreAttributes: false,
            row: true
        })
        return utils.formatSqlResult(result)
    }

    async getUserAndRoleById(id){
        let roleId = await sequelize.query('select role_id from sys_user_role where user_id = ? ',
            { replacements: [id], type: Sequelize.QueryTypes.SELECT });
        console.log(roleId)
        let result = await this.instance.model.findAll({where:{id:id},
            attributes:['id','name','loginName','email'],
            includeIgnoreAttributes:false});
        let user = utils.formatSqlResult(result);
        user[0].roleId=roleId[0].role_id;
        return  user[0];
    }

    async saveUser(user,roleId){
        let transaction;
        let userId = user.id;
        try{
            transaction =await sequelize.transaction();
            let result
            if (userId){
                result = await SysUserModel.model.update(user, {where:{id:userId},transaction});
            }else {
                result = await SysUserModel.model.create(user, {transaction});
            }

            userId = result.dataValues.id;
            await SysUserRoleModel.model.destroy({where:{userId:userId},transaction})

            await SysUserRoleModel.model.create({userId:userId,roleId:roleId},{transaction});
            transaction && transaction.commit() // 提交事务
            return true
        }catch (e) {
            console.log(e)
            transaction && transaction.rollback()
            return false
        }
    }

    async deleteUser(id){
        let transaction;
        try{
            transaction =await sequelize.transaction();
            await SysUserModel.model.destroy({where:{id:id},transaction})
            await SysUserRoleModel.model.destroy({where:{userId:id},transaction})
            transaction && transaction.commit() // 提交事务
            return true
        }catch (e) {
            console.log(e)
            transaction && transaction.rollback()
            return false
        }


    }
}

module.exports= new SysUserService();
