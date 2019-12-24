const mysql = require('mysql')
const databaseConfig = require('../config/mysql.config')  //引入数据库配置模块中的数据
const pool = mysql.createPool(databaseConfig)
class db {
  query (sql, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log('创建连接池连接失败！')
          reject(err)
        } else {
          console.log('创建连接池连接！')
          connection.query(sql, params, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
            console.log('关闭连接池连接！')
          })
        }
      })
    })
  }
  getReultBySql (sql, params) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await this.query(sql, params)
        resolve(data)
      } catch (error) {
        resolve(error)
      }
    })
  }
  insertSql (tableName, datas) {
    var fields = ''
    var values = ''
    for (var k in datas) {
      fields += k + ','
      values = values + "'" + datas[k] + "',"
    }
    fields = fields.slice(0, -1)
    values = values.slice(0, -1)
    console.log(fields, values)
    var sql = "INSERT INTO " + tableName + '(' + fields + ') VALUES(' + values + ')'
    console.log(sql);
    return this.getReultBySql(sql)
  }
  updateSql (tableName, sets, where) {
    var _SETS = '';
    for (var k in sets) {
      _SETS += k + "='" + sets[k] + "',";
    }
    _SETS = _SETS.slice(0, -1);
    var sql = "UPDATE " + tableName + ' SET ' + _SETS + ' WHERE ' + where;
    return this.getReultBySql(sql);
  }
  deleteSql (tableName, where) {
    var sql = "DELETE  FROM " + tableName + ' WHERE ' + where;
    return this.getReultBySql(sql);
  }
}

module.exports = db
