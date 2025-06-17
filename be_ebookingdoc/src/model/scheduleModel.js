class Schedule {
  constructor({
    uuid,
    doctor_id,
    clinic_id,
    start_time,
    end_time,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.doctor_id = doctor_id || null;
    this.clinic_id = clinic_id || null;
    this.start_time = start_time || null;
    this.end_time = end_time || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Schedule(row);
  }
  static fromRows(rows) {
    return rows.map(row => Schedule.fromRow(row));
  }
}
module.exports = Schedule;