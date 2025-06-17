const express = require('express');
const router = express.Router();
const db = require('../src/db'); // import kết nối MySQL

router.get('/', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi database');
    }

    // Truyền dữ liệu vào view
    res.render('index', { appointments: results });
  });
});

module.exports = router;
