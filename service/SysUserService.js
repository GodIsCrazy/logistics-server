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

/*    async saveUser(user,roleId){
        let transaction;
        try{
            transaction = sequelize.transaction();
            let result = await SysUserModel.model.create(user, {transaction});
            let userId = result.dataValues.id;
            let userRole = await SysUserRoleModel.model.create({userId:userId,roleId:roleId},{transaction});
            transaction.then(function () {
                transaction.commit()
            }).catch(function (e) {
                console.log(e)
                transaction.rollback()
            });
        }catch (e) {
            console.log(e)

        }
    }*/

    async saveUser(user,roleId){
        console.log(user)
        try {
            return await sequelize.transaction().then(function (transaction) {
                return SysUserModel.model.create(user, {transaction})
                    .then(function (user) {
                        let userId = user.dataValues.id;
                        return SysUserRoleModel.model.create(
                            {userId:userId,roleId:roleId},{transaction})
                        .then(()=>{
                            transaction.commit()
                        })
                        .catch((e)=>{
                            console.log(e);
                            transaction.rollback()
                        })
                });
            }).then(function (result) {
                return true
            }).catch(function (err) {
                console.log(err)
                return false
            });
        }catch (e) {
            console.log(e)
            return false
        }


    }
    async deleteUser(id){
        try {
            return await sequelize.transaction().then(function (transaction) {
                return SysUserModel.model.destroy({where:{id:id},transaction:transaction})
                    .then(function () {
                        return SysUserRoleModel.model.destroy(
                            {where:{userId:id},transaction:transaction})
                            .then(()=>{
                                transaction.commit()
                            })
                            .catch((e)=>{
                                console.log(e);
                                transaction.rollback()
                            })
                    });
            }).then(function (result) {
                return true
            }).catch(function (err) {
                console.log(err)
                return false
            });
        }catch (e) {
            console.log(e)
            return false
        }


    }
}

module.exports= new SysUserService();
