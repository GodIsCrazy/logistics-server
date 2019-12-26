class BaseService{
    constructor(instance){
        this.instance = instance
    }
    baseSet
    baseFindAll(attributes){
        return this.instance.findAll(attributes)
    }
    baseFindPageByFilter(pageSize,currentPage,where){
        return this.instance.findByPageFilter(pageSize,currentPage,where)
    }

    baseFindLikePageByFilter(pageSize,currentPage,where){
        return this.instance.findLikeByPageFilter(pageSize,currentPage,where)
    }
    baseFindByFilter(where){
        return this.instance.findByFilter(where)
    }
    baseFindByFilterOrder(attributes, where, order){
        return this.instance.findByFilterOrder(attributes, where, order)
    }
    baseFindLikeByFilter(attributes, where){
        return this.instance.findLikeByFilter(attributes, where)
    }
    baseFindLikeByFilterOrder(attributes, where, order){
        return this.instance.findLikeByFilterOrder(attributes, where, order)
    }
    baseUpdate(attributes, where){
        return this.instance.update(attributes, where)
    }
    baseDelete(where){
        return this.instance.delete(where)
    }
    baseCreate(entity){
        return this.instance.create(entity)
    }
    baseCreateBatch(entitys){
        return this.instance.createBatch(entitys)
    }
}
module.exports = BaseService
