// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // mặc định XAMPP không có mật khẩu
  database: 'ebookingdoc'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Kết nối thất bại:', err);
    return;
  }
  console.log('✅ Kết nối MySQL thành công!');
});

module.exports = connection;
