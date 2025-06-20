const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const MedicalService = require("../model/medicalserviceModel");

class MedicalServiceService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM medical_services ORDER BY created_at DESC");
    return MedicalService.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM medical_services WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return MedicalService.fromRow(rows[0]);
  }
  static async create({ name, description, price, specialization_id, clinic_id, hospital_id, image }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO medical_services (uuid, name, description, price, specialization_id, clinic_id, hospital_id, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, name, description, price, specialization_id, clinic_id, hospital_id, image]
    );
    return { uuid, name, description, price, specialization_id, clinic_id, hospital_id, image };
  }
  
  static async update(
    uuid,
    {
      name,
      description,
      price,
      specialization_id,
      clinic_id,
      hospital_id,
      image,
    }
  ) {

    if (!uuid) throw new Error("Thiếu UUID để cập nhật");
    if (!name || !price) throw new Error("Tên và giá là bắt buộc");
  
    
    const values = [
      name || null,
      description || null,
      price || 0,
      specialization_id || null,
      clinic_id || null,
      hospital_id || null,
      image || null,
      uuid,
    ];
  
    const [result] = await db.execute(
      `UPDATE medical_services
       SET name=?, description=?, price=?, specialization_id=?, clinic_id=?, hospital_id=?, image=?, updated_at=NOW()
       WHERE uuid=?`,
      values
    );
  
    return result.affectedRows > 0;
  }
  
  
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM medical_services WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = MedicalServiceService;
