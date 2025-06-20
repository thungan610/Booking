const MedicalServiceService = require("../service/medical_service");
const { getImageValue } = require("../helper/image.helper");

class MedicalServiceController {
  static async getAll(req, res) {
    try {
      const data = await MedicalServiceService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async getById(req, res) {
    try {
      const data = await MedicalServiceService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async create(req, res) {
    try {
      const { name, description, price, specialization_id, clinic_id, hospital_id, image } = req.body;
  
      const result = await MedicalServiceService.create({
        name,
        description,
        price,
        specialization_id,
        clinic_id,
        hospital_id,
        image,
      });
  
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }
   // chỉnh full 
   static async update(req, res) {
    try {
      console.log("Body nhận được:", req.body);
      console.log("Params:", req.params);
  
      const { name, description, price, specialization_id, clinic_id, hospital_id, image } = req.body;
      const imageValue = await getImageValue(req.file, image, "medical_services");
  
      const updated = await MedicalServiceService.update(req.params.uuid, {
        name,
        description,
        price,
        specialization_id,
        clinic_id,
        hospital_id,
        image: imageValue,
      });
  
      if (!updated) {
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để cập nhật", status: "error" });
      }
  
      res.json({ code: 200, msg: "Cập nhật thành công", status: "success" });
    } catch (error) {
      console.error("Lỗi cập nhật:", error); // Log chi tiết lỗi
      res.status(error.statusCode || 500).json({
        code: error.statusCode || 500,
        msg: error.message || "Lỗi hệ thống",
        status: "error",
      });
    }
  }
  

  // static async delete(req, res) {
  //   try {
  //     const deleted = await MedicalServiceService.remove(req.params.id);
  //     if (!deleted)
  //       return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
  //     res.json({ code: 200, msg: "Xóa thành công", status: "success" });
  //   } catch (error) {
  //     res.status(500).json({ code: 500, msg: error.message, status: "error" });
  //   }
  // }
  static async delete(req, res) {
    try {
      const { uuid } = req.params;
      if (!uuid) throw new Error("Thiếu uuid");
  
      await MedicalServiceService.remove(uuid);
      res.json({ code: 200, msg: "Xoá thành công", status: "success" });
    } catch (error) {
      res.status(400).json({ code: 400, msg: error.message, status: "error" });
    }
  }
  
}
module.exports = MedicalServiceController;
