class CarouselItem {
  constructor({
    uuid,
    image,
    title,
    description,
    created_at,
    updated_at,
  }) {
    this.uuid = uuid || null;
    this.image = image || null;
    this.title = title || null;
    this.description = description || null;
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }
  static fromRow(row) {
    return new CarouselItem(row);
  }
  static fromRows(rows) {
    return rows.map(row => CarouselItem.fromRow(row));
  }
}
module.exports = CarouselItem;
