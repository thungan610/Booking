const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Doctor = require("../model/doctorModel");

class DoctorService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM doctors ORDER BY created_at DESC");
    return Doctor.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM doctors WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Doctor.fromRow(rows[0]);
  }
  static async create({ user_id, doctor_type, specialization_id, license, introduce, image }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO doctors (uuid, user_id, doctor_type, specialization_id, license, introduce, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, user_id, doctor_type, specialization_id, license, introduce, image]
    );
    return { uuid, user_id, doctor_type, specialization_id, license, introduce, image };
  }
  static async update(uuid, { user_id, doctor_type, specialization_id, license, introduce, image }) {
    const [result] = await db.execute(
      "UPDATE doctors SET user_id=?, doctor_type=?, specialization_id=?, license=?, introduce=?, image=?, updated_at=NOW() WHERE uuid=?",
      [user_id, doctor_type, specialization_id, license, introduce, image, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM doctors WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = DoctorService;
