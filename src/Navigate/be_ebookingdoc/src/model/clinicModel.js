class Clinic {
  constructor({
    uuid,
    name,
    address,
    phone,
    email,
    image,
    hospital_id,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.name = name || null;
    this.address = address || null;
    this.phone = phone || null;
    this.email = email || null;
    this.image = image || null;
    this.hospital_id = hospital_id || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Clinic(row);
  }
  static fromRows(rows) {
    return rows.map(row => Clinic.fromRow(row));
  }
}
module.exports = Clinic;
