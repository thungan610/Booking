class Premission {
  constructor({ id, name, created_at, updated_at }) {
    this.id = id || null;
    this.name = name || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Premission(row);
  }
  static fromRows(rows) {
    return rows.map(row => Premission.fromRow(row));
  }
}
module.exports = Premission;
