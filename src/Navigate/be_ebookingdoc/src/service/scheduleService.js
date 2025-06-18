const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Schedule = require("../model/scheduleModel");

class ScheduleService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM schedules ORDER BY created_at DESC");
    return Schedule.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM schedules WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Schedule.fromRow(rows[0]);
  }
  static async create({ doctor_id, clinic_id, start_time, end_time }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO schedules (uuid, doctor_id, clinic_id, start_time, end_time, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, doctor_id, clinic_id, start_time, end_time]
    );
    return { uuid, doctor_id, clinic_id, start_time, end_time };
  }
  static async update(uuid, { doctor_id, clinic_id, start_time, end_time }) {
    const [result] = await db.execute(
      "UPDATE schedules SET doctor_id=?, clinic_id=?, start_time=?, end_time=?, updated_at=NOW() WHERE uuid=?",
      [doctor_id, clinic_id, start_time, end_time, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM schedules WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = ScheduleService;