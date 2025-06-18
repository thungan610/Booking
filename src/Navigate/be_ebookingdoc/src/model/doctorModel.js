class Doctor {
  constructor({
    uuid,
    user_id,
    doctor_type,
    specialization_id,
    license,
    introduce,
    image,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.user_id = user_id || null;
    this.doctor_type = doctor_type || null;
    this.specialization_id = specialization_id || null;
    this.license = license || null;
    this.introduce = introduce || null;
    this.image = image || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Doctor(row);
  }
  static fromRows(rows) {
    return rows.map(row => Doctor.fromRow(row));
  }
}
module.exports = Doctor;
