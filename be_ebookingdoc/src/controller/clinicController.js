const ClinicService = require("../service/clinicService");
const { getImageValue } = require("../helper/image.helper");

class ClinicController {
  static async getAll(req, res) {
    try {
      const data = await ClinicService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ClinicService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }

  static async create(req, res) {
    try {
      const { name, address, phone, email, image, hospital_uuid} = req.body;
      const imageValue = await getImageValue(req.file, image, "clinics");
      const result = await ClinicService.create({
        name,
        address,
        phone,
        email,
        image: imageValue,
        hospital_uuid,
      });
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }

  static async update(req, res) {
    try {
      const {
        name = null,
        address = null,
        phone = null,
        email = null,
        image = null,
        hospital_uuid = null,
      } = req.body;
  
      const imageValue = await getImageValue(req.file, image, "clinics");
  
      const updated = await ClinicService.update(req.params.uuid, {
        name,
        address,
        phone,
        email,
        image: imageValue ?? null,
        hospital_id: hospital_uuid ?? null, // 🚨 Chú ý: DB là hospital_id
      });
  
      if (!updated)
        return res.status(404).json({
          code: 404,
          msg: "Không tìm thấy để cập nhật",
          status: "error",
        });
  
      res.json({
        code: 200,
        msg: "Cập nhật thành công",
        status: "success",
      });
    } catch (error) {
      console.error("Update lỗi:", error); // Để dễ debug hơn
      res.status(error.statusCode || 400).json({
        code: error.statusCode || 400,
        msg: error.message,
        status: "error",
      });
    }
  }
  

  static async delete(req, res) {
    try {
      const deleted = await ClinicService.remove(req.params.uuid);
      if (!deleted)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
      res.json({ code: 200, msg: "Xóa thành công", status: "success" });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
}

module.exports = ClinicController;