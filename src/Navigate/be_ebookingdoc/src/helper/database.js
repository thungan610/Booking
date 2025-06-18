const mysql = require("mysql2/promise");
  require("dotenv").config();

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    timezone: process.env.MYSQL_TIMEZONE,
  });

  // Kiểm tra kết nối ngay khi khởi tạo pool
  (async () => {
    try {
      const conn = await pool.getConnection();
      console.log('Kết nối MySQL thành công!');
      conn.release();
    } catch (error) {
      console.error('Lỗi kết nối MySQL:', error);
      throw error;
    }
  })();

  async function execute(sql, params) {
    try {
      const [results, fields] = await pool.execute(sql, params);
      console.log('Execute query:', sql, 'with params:', params, 'results:', results);
      return [results, fields];
    } catch (error) {
      console.error('Database execute error:', error);
      throw error;
    }
  }

  async function queryMultiple(sqlList, params) {
    const conn = await pool.getConnection();
    const result = [];
    try {
      for (let i = 0; i < sqlList.length; i++) {
        const [element] = await conn.query(sqlList[i], params);
        result.push(element);
      }
    } catch (error) {
      console.error('Database queryMultiple error:', error);
      throw error;
    } finally {
      conn.release();
    }
    return result;
  }

  module.exports = {
    execute,
    queryMultiple,
  };