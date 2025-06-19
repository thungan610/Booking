const db = require("../helper/database");
const Hospital = require("../model/hospitalModel");
const { v4: uuidv4 } = require("uuid");

class HospitalService {
  static async getAll() {
    const [rows] = await db.execute(
      "SELECT * FROM hospitals ORDER BY created_at DESC"
    );
    return Hospital.fromRows(rows);
  }

  static async getById(uuid) {
    if (!uuid) throw new Error("Thiếu UUID khi lấy dữ liệu");

    const [rows] = await db.execute(
      "SELECT * FROM hospitals WHERE uuid = ?",
      [uuid]
    );
    if (rows.length === 0) return null;
    return Hospital.fromRow(rows[0]);
  }

  static async create({ name, address, image }) {
    if (name === undefined || address === undefined || image === undefined) {
      throw new Error("Thiếu dữ liệu khi tạo mới (name, address, image)");
    }

    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO hospitals (uuid, name, address, image, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [uuid, name ?? null, address ?? null, image ?? null]
    );
    return { uuid, name, address, image };
  }

  static async update(uuid, { name, address, image }) {
    if (!uuid || name === undefined || address === undefined || image === undefined) {
      throw new Error("Thiếu dữ liệu cập nhật (uuid, name, address, image)");
    }

    const [result] = await db.execute(
      "UPDATE hospitals SET name = ?, address = ?, image = ?, updated_at = NOW() WHERE uuid = ?",
      [name ?? null, address ?? null, image ?? null, uuid]
    );
    return result.affectedRows > 0;
  }

  static async remove(uuid) {
    if (!uuid) {
      throw new Error("UUID không được bỏ trống khi xóa");
    }

    const [result] = await db.execute(
      "DELETE FROM hospitals WHERE uuid = ?",
      [uuid]
    );
    return result.affectedRows > 0;
  }
}

module.exports = HospitalService;
