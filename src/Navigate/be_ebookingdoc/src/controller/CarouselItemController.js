const CarouselItemService = require("../service/CarouselItemService");
const { getImageValue } = require("../helper/image.helper");

class CarouselItemController {
  static async getAll(req, res) {
    try {
      const data = await CarouselItemService.getAll();
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async getById(req, res) {
    try {
      const data = await CarouselItemService.getById(req.params.id);
      if (!data)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy", status: "error" });
      res.json({ code: 200, msg: "Thành công", status: "success", data });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
  static async create(req, res) {
    try {
      const { image, title, description } = req.body;
      const imageValue = await getImageValue(req.file, image, "carousel_items");
      const result = await CarouselItemService.create({
        image: imageValue,
        title,
        description,
      });
      res.status(201).json({ code: 201, msg: "Tạo thành công", status: "success", data: result });
    } catch (error) {
      res.status(error.statusCode || 400).json({ code: error.statusCode || 400, msg: error.message, status: "error" });
    }
  }
  static async update(req, res) {
    try {
      const { image, title, description } = req.body;
      const imageValue = await getImageValue(req.file, image, "carousel_items");
      const updated = await CarouselItemService.update(req.params.id, {
        image: imageValue,
        title,
        description,
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
      const deleted = await CarouselItemService.remove(req.params.id);
      if (!deleted)
        return res.status(404).json({ code: 404, msg: "Không tìm thấy để xóa", status: "error" });
      res.json({ code: 200, msg: "Xóa thành công", status: "success" });
    } catch (error) {
      res.status(500).json({ code: 500, msg: error.message, status: "error" });
    }
  }
}
module.exports = CarouselItemController;
