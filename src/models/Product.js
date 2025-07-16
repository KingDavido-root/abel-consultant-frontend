// Product model class
export class Product {
  constructor({
    id,
    name,
    description,
    price,
    category,
    brand,
    model,
    technicalSpecs = {},
    variants = [],
    images = [],
    stock = 0,
    ratings = [],
    reviews = [],
    questions = [],
    relatedProducts = [],
    tags = [],
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.brand = brand;
    this.model = model;
    this.technicalSpecs = technicalSpecs;
    this.variants = variants;
    this.images = images;
    this.stock = stock;
    this.ratings = ratings;
    this.reviews = reviews;
    this.questions = questions;
    this.relatedProducts = relatedProducts;
    this.tags = tags;
    this.averageRating = this.calculateAverageRating();
  }

  // Calculate average rating
  calculateAverageRating() {
    if (!this.ratings.length) return 0;
    const sum = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
    return (sum / this.ratings.length).toFixed(1);
  }

  // Add a new variant
  addVariant(variant) {
    this.variants.push(variant);
  }

  // Add a new image
  addImage(image) {
    this.images.push(image);
  }

  // Add a new review
  addReview(review) {
    this.reviews.push(review);
    if (review.rating) {
      this.ratings.push(review.rating);
      this.averageRating = this.calculateAverageRating();
    }
  }

  // Add a new question
  addQuestion(question) {
    this.questions.push(question);
  }

  // Add related product
  addRelatedProduct(productId) {
    if (!this.relatedProducts.includes(productId)) {
      this.relatedProducts.push(productId);
    }
  }

  // Update stock
  updateStock(quantity) {
    this.stock = quantity;
  }

  // Check if product is in stock
  isInStock() {
    return this.stock > 0;
  }

  // Get available variants
  getAvailableVariants() {
    return this.variants.filter(variant => variant.stock > 0);
  }

  // Get formatted price
  getFormattedPrice() {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(this.price);
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      brand: this.brand,
      model: this.model,
      technicalSpecs: this.technicalSpecs,
      variants: this.variants,
      images: this.images,
      stock: this.stock,
      ratings: this.ratings,
      reviews: this.reviews,
      questions: this.questions,
      relatedProducts: this.relatedProducts,
      tags: this.tags,
      averageRating: this.averageRating
    };
  }
}
