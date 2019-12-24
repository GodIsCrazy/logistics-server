const mysql = require('mysql')
const databaseConfig = require('../config/mysql.config')  //引入数据库配置模块中的数据

class db {
  static connectStatus = false
  connection = null
  constructor() {
    this.connect()
  }
  async connect () {
    try {
      this.connection = await mysql.createPool(databaseConfig)
      this.connectStatus = true
    } catch (error) {
      this.connect = null
      this.connectStatus = false
      throw ("数据库连接失败！")
    }

  }
  query (sql, params, callback) {
    return this.connect.query()
  }
}
