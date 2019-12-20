var StatusCode={
    SUCCESS:{
        code:'C00001',
        description:'请求成功'
    },
    INVALID_REQ:{
        code:'C00002',
        description:'无效请求'
    },
    ACCOUNT_ERROR:{
        code:'C00003',
        description:'账号密码错误'
    },
    NO_ROLE:{
        code:'C00004',
        description:'没有权限'
    },
    FAILED:{
        code:'C00005',
        description:'请求失败'
    },
    ERR:{
        code:'C00006',
        description:'后台异常'
    },
    TOKEN_LOSR:{
        code:'C00007',
        description:'token失效'
    }


}
module.exports=exports=StatusCode;
