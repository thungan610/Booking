const { uploadImageToCloudinary } = require("../service/uploadimage");
const fs = require("fs").promises;
const validator = require("validator");

function sanitizeInput(value) {
  if (typeof value !== "string") return value;
  return value.replace(/[\n\r\t\x00-\x1F\x7F-\x9F]/g, "").trim();
}

async function getImageValue(file, image, folder = "uploads") {
  let imageValue = null;
  if (file && file.path) {
    try {
      imageValue = await uploadImageToCloudinary(file.path, folder);
      await fs.unlink(file.path).catch((err) =>
        console.error("Error deleting local file:", err)
      );
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      const error = new Error("Lỗi khi upload ảnh đại diện!");
      error.statusCode = 500;
      throw error;
    }
  } else if (image && typeof image === "string") {
    if (!validator.isURL(image)) {
      const error = new Error("URL ảnh không hợp lệ!");
      error.statusCode = 400;
      throw error;
    }
    imageValue = sanitizeInput(image);
  }
  return imageValue;
}

module.exports = { getImageValue };
