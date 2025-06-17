const db = require("../helper/database");
const Premission = require("../model/premissionModel");

class PremissionService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM premission ORDER BY created_at DESC");
    return Premission.fromRows(rows);
  }
  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM premission WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return Premission.fromRow(rows[0]);
  }
  static async create({ name }) {
    const [result] = await db.execute(
      "INSERT INTO premission (name, created_at, updated_at) VALUES (?, NOW(), NOW())",
      [name]
    );
    return { id: result.insertId, name };
  }
  static async update(id, { name }) {
    const [result] = await db.execute(
      "UPDATE premission SET name=?, updated_at=NOW() WHERE id=?",
      [name, id]
    );
    return result.affectedRows > 0;
  }
  static async remove(id) {
    const [result] = await db.execute("DELETE FROM premission WHERE id=?", [id]);
    return result.affectedRows > 0;
  }
}
module.exports = PremissionService;
