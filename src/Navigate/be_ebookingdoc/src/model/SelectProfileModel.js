class SelectProfile {
  constructor({
    uuid,
    user_id,
    name,
    relationship,
    image,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.user_id = user_id || null;
    this.name = name || null;
    this.relationship = relationship || null;
    this.image = image || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new SelectProfile(row);
  }
  static fromRows(rows) {
    return rows.map(row => SelectProfile.fromRow(row));
  }
}
module.exports = SelectProfile;
