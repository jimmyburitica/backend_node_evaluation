const MongoLib = require('../lib/mongo');

class ProductsService
{
  constructor()
  {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ categoryId })
  {
    const query = categoryId && { categoryId: categoryId };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId })
  {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product })
  {
    const createdProduct = await this.mongoDB.create(this.collection, product);
    return createdProduct;
  }

  async updateProduct({ productId, product } = {})
  {
    const updatedProduct = await this.mongoDB.update(this.collection, productId, product);
    return updatedProduct;
  }

  async deleteProduct({ productId })
  {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
    // return true;
  }
}

module.exports = ProductsService;