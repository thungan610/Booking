class MedicalRecord {
  constructor({
    uuid,
    patient_id,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.patient_id = patient_id || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new MedicalRecord(row);
  }
  static fromRows(rows) {
    return rows.map(row => MedicalRecord.fromRow(row));
  }
}
module.exports = MedicalRecord;
