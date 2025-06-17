const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const MedicalRecord = require("../model/medicalRecordModel");

class MedicalRecordService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM medical_records ORDER BY created_at DESC");
    return MedicalRecord.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM medical_records WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return MedicalRecord.fromRow(rows[0]);
  }
  static async create({ patient_id }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO medical_records (uuid, patient_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [uuid, patient_id]
    );
    return { uuid, patient_id };
  }
  static async update(uuid, { patient_id }) {
    const [result] = await db.execute(
      "UPDATE medical_records SET patient_id = ?, updated_at = NOW() WHERE uuid = ?",
      [patient_id, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM medical_records WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = MedicalRecordService;
