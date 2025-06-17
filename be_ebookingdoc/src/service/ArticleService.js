const db = require("../helper/database");
const { v4: uuidv4 } = require("uuid");
const Article = require("../model/ArticleModel");

class ArticleService {
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM articles ORDER BY created_at DESC");
    return Article.fromRows(rows);
  }
  static async getById(uuid) {
    const [rows] = await db.execute("SELECT * FROM articles WHERE uuid = ?", [uuid]);
    if (rows.length === 0) return null;
    return Article.fromRow(rows[0]);
  }
  static async create({ title, content, image, author }) {
    const uuid = uuidv4().replace(/-/g, "").slice(0, 32);
    await db.execute(
      "INSERT INTO articles (uuid, title, content, image, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [uuid, title, content, image, author]
    );
    return { uuid, title, content, image, author };
  }
  static async update(uuid, { title, content, image, author }) {
    const [result] = await db.execute(
      "UPDATE articles SET title=?, content=?, image=?, author=?, updated_at=NOW() WHERE uuid=?",
      [title, content, image, author, uuid]
    );
    return result.affectedRows > 0;
  }
  static async remove(uuid) {
    const [result] = await db.execute("DELETE FROM articles WHERE uuid = ?", [uuid]);
    return result.affectedRows > 0;
  }
}
module.exports = ArticleService;
