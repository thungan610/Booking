const DoctorService = require("../service/doctorService");
const { getImageValue } = require("../helper/image.helper");

class DoctorController {
  static async getAll(req, res) {
    try {
      const data = await DoctorService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async getById(req, res) {
    try {
      const data = await DoctorService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async create(req, res) {
    try {
      const { user_id, doctor_type, specialization_id, license, introduce, image } = req.body;
      const imageValue = await getImageValue(req.file, image, "doctors");
      const result = await DoctorService.create({
        user_id,
        doctor_type,
        specialization_id,
        license,
        introduce,
        image: imageValue,
      });
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }
  static async update(req, res) {
    try {
      const { user_id, doctor_type, specialization_id, license, introduce, image } = req.body;
      const imageValue = await getImageValue(req.file, image, "doctors");
      const updated = await DoctorService.update(req.params.id, {
        user_id,
        doctor_type,
        specialization_id,
        license,
        introduce,
        image: imageValue,
      });
      if (!updated)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để cập nhật", status: "error" });
      res.json({ code: 200, msg: "Cập nhật thành công", status: "success" });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }
  static async delete(req, res) {
    try {
      const deleted = await DoctorService.remove(req.params.id);
      if (!deleted)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
      res.json({ code: 200, msg: "Xóa thành công", status: "success" });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
}
module.exports = DoctorController;
