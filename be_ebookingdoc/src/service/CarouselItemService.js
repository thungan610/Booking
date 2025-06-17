const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const CarouselItem = require("../model/CarouselItemModel");

class CarouselItemService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM carousel_items ORDER BY created_at DESC");
    return CarouselItem.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM carousel_items WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return CarouselItem.fromRow(rows[0]);
  }
  static async create({ image, title, description }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO carousel_items (uuid, image, title, description, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [uuid, image, title, description]
    );
    return { uuid, image, title, description };
  }
  static async update(uuid, { image, title, description }) {
    const [result] = await db.execute(
      "UPDATE carousel_items SET image=?, title=?, description=?, updated_at=NOW() WHERE uuid=?",
      [image, title, description, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM carousel_items WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = CarouselItemService;
