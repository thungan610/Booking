const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const SelectProfile = require("../model/SelectProfileModel");

class SelectProfileService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM select_profiles ORDER BY created_at DESC");
    return SelectProfile.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM select_profiles WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return SelectProfile.fromRow(rows[0]);
  }
  static async create({ user_id, name, relationship, image }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO select_profiles (uuid, user_id, name, relationship, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, user_id, name, relationship, image]
    );
    return { uuid, user_id, name, relationship, image };
  }
  static async update(uuid, { user_id, name, relationship, image }) {
    const [result] = await db.execute(
      "UPDATE select_profiles SET user_id=?, name=?, relationship=?, image=?, updated_at=NOW() WHERE uuid=?",
      [user_id, name, relationship, image, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM select_profiles WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = SelectProfileService;
