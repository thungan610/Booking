class Specialization {
  constructor({ uuid, name, created_at, updated_at }) {
    this.uuid = uuid || null;
    this.name = name || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Specialization(row);
  }
  static fromRows(rows) {
    return rows.map(row => Specialization.fromRow(row));
  }
}
module.exports = Specialization;
