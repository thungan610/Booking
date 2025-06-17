const SelectProfileService = require("../service/SelectProfileService");
const { getImageValue } = require("../helper/image.helper");

class SelectProfileController {
  static async getAll(req, res) {
    try {
      const data = await SelectProfileService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async getById(req, res) {
    try {
      const data = await SelectProfileService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async create(req, res) {
    try {
      const { user_id, name, relationship, image } = req.body;
      const imageValue = await getImageValue(req.file, image, "select_profiles");
      const result = await SelectProfileService.create({
        user_id,
        name,
        relationship,
        image: imageValue,
      });
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }
  static async update(req, res) {
    try {
      const { user_id, name, relationship, image } = req.body;
      const imageValue = await getImageValue(req.file, image, "select_profiles");
      const updated = await SelectProfileService.update(req.params.id, {
        user_id,
        name,
        relationship,
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
      const deleted = await SelectProfileService.remove(req.params.id);
      if (!deleted)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
      res.json({ code: 200, msg: "Xóa thành công", status: "success" });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
}
module.exports = SelectProfileController;
