class Review {
  constructor({
    uuid,
    user_id,
    doctor_id,
    appointment_id,
    stars,
    comment,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.user_id = user_id || null;
    this.doctor_id = doctor_id || null;
    this.appointment_id = appointment_id || null;
    this.stars = stars || null;
    this.comment = comment || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Review(row);
  }
  static fromRows(rows) {
    return rows.map(row => Review.fromRow(row));
  }
}
module.exports = Review;
