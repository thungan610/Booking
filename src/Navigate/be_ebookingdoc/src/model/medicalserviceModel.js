class MedicalService {
  constructor({
    uuid,
    name,
    description,
    price,
    specialization_id,
    clinic_id,
    hospital_id,
    image,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.name = name || null;
    this.description = description || null;
    this.price = price || null;
    this.specialization_id = specialization_id || null;
    this.clinic_id = clinic_id || null;
    this.hospital_id = hospital_id || null;
    this.image = image || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new MedicalService(row);
  }
  static fromRows(rows) {
    return rows.map(row => MedicalService.fromRow(row));
  }
}
module.exports = MedicalService;
