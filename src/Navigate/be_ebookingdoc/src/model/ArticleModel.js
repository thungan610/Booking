class Article {
  constructor({
    uuid,
    title,
    content,
    image,
    author,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.title = title || null;
    this.content = content || null;
    this.image = image || null;
    this.author = author || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new Article(row);
  }
  static fromRows(rows) {
    return rows.map(row => Article.fromRow(row));
  }
}
module.exports = Article;
