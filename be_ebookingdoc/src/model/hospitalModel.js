class Hospital {
  constructor({
    uuid,
    name,
    address,
    image,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.name = name || null;
    this.address = address || null;
    this.image = image || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  static fromRow(row) {
    return new Hospital(row);
  }

  static fromRows(rows) {
    return rows.map(row => Hospital.fromRow(row));
  }
}

module.exports = Hospital;
