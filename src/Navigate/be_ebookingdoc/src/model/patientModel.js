class Patient {
  constructor({
    uuid,
    user_id,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.user_id = user_id || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Patient(row);
  }
  static fromRows(rows) {
    return rows.map(row => Patient.fromRow(row));
  }
}
module.exports = Patient;
