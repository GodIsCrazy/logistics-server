let mysql = require('mysql');//引入mysql模块
var databaseConfig = require('../config/mysql.config');  //引入数据库配置模块中的数据
var dbUtil = {
    query : function(sql,params,callback){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(databaseConfig);
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
            connection.query( sql, params, function(err,results,fields ){
                if(err){
                    console.log('数据操作失败');
                    throw err;
                }
                //将查询出来的数据返回给回调函数
                return callback && callback(results, fields);
                //results作为数据操作后的结果，fields作为数据库连接的一些字段
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end(function(err){
                    if(err){
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    },
    insertSql : function (tableName,datas) {
        var fields='';
        var values='';
        for( var k in datas){
            fields+=k+',';
            values=values+"'"+datas[k]+"',"
        }
        fields=fields.slice(0,-1);
        values=values.slice(0,-1);
        console.log(fields,values);
        var sql="INSERT INTO "+tableName+'('+fields+') VALUES('+values+')';
        console.log(sql);
        return this.getReultBySql(sql);

    },
    updateSql : function (tableName,sets,where) {
        var _SETS='';
        for(var k in sets){
            _SETS+=k+"='"+sets[k]+"',";
        }
        _SETS=_SETS.slice(0,-1);
        var sql="UPDATE "+tableName+' SET '+_SETS+' WHERE '+where;
        return this.getReultBySql(sql);
    },
    deleteSql : function(tableName,where){
        var sql="DELETE  FROM "+tableName+' WHERE '+where;
        return this.getReultBySql(sql);
    },
    getReultBySql:function (sql,params) {
        return new Promise((resolve,reject) => {
            this.query(sql,params,function (result,fields) {
                if (result.length > 0) {
                    resolve(result)
                }else{
                    resolve(false)
                }
            })
        })
    }
}
module.exports = exports = dbUtil
