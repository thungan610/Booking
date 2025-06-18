const AppointmentService = require("../service/appointmentService");

class AppointmentController {
  static async getAll(req, res) {
    try {
      const data = await AppointmentService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
 // specializationController.js
static async getById(req, res) {
  try {
    const uuid = req.params.uuid;
    // Log lại uuid để chắc chắn đúng
    console.log('[SpecializationController] uuid:', uuid);
    const data = await SpecializationService.getById(uuid);
    if (!data)
      return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
    res.json({ code: 200, msg: "Thành công", status: "success", data });
  } catch (error) {
    res.status(500).json({ code: 500, msg: error.message, status: "error" });
  }
}

  static async create(req, res) {
    try {
      const {
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
      } = req.body;
      const result = await AppointmentService.create({
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
      });
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(400).json({ code: 400, msg: error.message, status: "error" });
    }
  }
  static async update(req, res) {
    try {
      const {
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
      } = req.body;
      const updated = await AppointmentService.update(req.params.id, {
        doctor_id,
        patient_id,
        clinic_id,
        hospital_id,
        schedule_id,
        date,
        status,
      });
      if (!updated)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để cập nhật", status: "error" });
      res.json({ code: 200, msg: "Cập nhật thành công", status: "success" });
    } catch (error) {
      res.status(400).json({ code: 400, msg: error.message, status: "error" });
    }
  }
  static async delete(req, res) {
    try {
      const deleted = await AppointmentService.remove(req.params.id);
      if (!deleted)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
      res.json({ code: 200, msg: "Xóa thành công", status: "success" });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
}
module.exports = AppointmentController;
