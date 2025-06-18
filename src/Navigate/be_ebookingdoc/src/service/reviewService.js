const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Review = require("../model/reviewModel");

class ReviewService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM reviews ORDER BY created_at DESC");
    return Review.fromRows(rows);
  }

  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM reviews WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Review.fromRow(rows[0]);
  }

  static async create({ user_id, doctor_id, appointment_id, stars, comment }) {
    // Kiểm tra đã từng có appointment với doctor này chưa (chỉ cho review nếu đã khám)
    const [appointments] = await db.execute(
      "SELECT uuid FROM appointments WHERE uuid = ? AND doctor_id = ? AND patient_id = ?",
      [appointment_id, doctor_id, user_id]
    );
    if (!appointments || appointments.length === 0) {
      throw new Error("Bạn chưa từng khám bác sĩ này hoặc sai mã lịch sử khám!");
    }
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO reviews (uuid, user_id, doctor_id, appointment_id, stars, comment, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, user_id, doctor_id, appointment_id, stars, comment]
    );
    return {
      uuid,
      user_id,
      doctor_id,
      appointment_id,
      stars,
      comment,
    };
  }

  static async update(
    uuid,
    { stars, comment }
  ) {
    const [result] = await db.execute(
      "UPDATE reviews SET stars=?, comment=?, updated_at=NOW() WHERE uuid=?",
      [stars, comment, uuid]
    );
    return result.affectedRows > 0;
  }

  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM reviews WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = ReviewService;
