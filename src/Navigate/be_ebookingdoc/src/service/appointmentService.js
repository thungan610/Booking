const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Appointment = require("../model/appointmentModel");

class AppointmentService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM appointments ORDER BY created_at DESC");
    return Appointment.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM appointments WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Appointment.fromRow(rows[0]);
  }
  static async create({
    doctor_id,
    patient_id,
    clinic_id,
    hospital_id,
    schedule_id,
    date,
    status,
  }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO appointments (uuid, doctor_id, patient_id, clinic_id, hospital_id, schedule_id, date, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        uuid,
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
      ]
    );
    return {
      uuid,
      doctor_id,
      patient_id,
      clinic_id,
      hospital_id,
      schedule_id,
      date,
      status,
    };
  }
  static async update(
    uuid,
    { doctor_id, patient_id, clinic_id, hospital_id, schedule_id, date, status }
  ) {
    const [result] = await db.execute(
      "UPDATE appointments SET doctor_id=?, patient_id=?, clinic_id=?, hospital_id=?, schedule_id=?, date=?, status=?, updated_at=NOW() WHERE uuid=?",
      [
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
        uuid,
      ]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM appointments WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = AppointmentService;
