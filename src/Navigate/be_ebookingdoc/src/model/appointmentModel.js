class Appointment {
  constructor({
    uuid,
    doctor_id,
    patient_id,
    clinic_id,
    hospital_id,
    schedule_id,
    date,
    status,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.doctor_id = doctor_id || null;
    this.patient_id = patient_id || null;
    this.clinic_id = clinic_id || null;
    this.hospital_id = hospital_id || null;
    this.schedule_id = schedule_id || null;
    this.date = date || null;
    this.status = status || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Appointment(row);
  }
  static fromRows(rows) {
    return rows.map(row => Appointment.fromRow(row));
  }
}
module.exports = Appointment;
