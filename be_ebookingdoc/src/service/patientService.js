const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Patient = require("../model/patientModel");

class PatientService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM patients ORDER BY created_at DESC");
    return Patient.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM patients WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Patient.fromRow(rows[0]);
  }
  static async create({ user_id }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO patients (uuid, user_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [uuid, user_id]
    );
    return { uuid, user_id };
  }
  static async update(uuid, { user_id }) {
    const [result] = await db.execute(
      "UPDATE patients SET user_id = ?, updated_at = NOW() WHERE uuid = ?",
      [user_id, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM patients WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = PatientService;
