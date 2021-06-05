const MongoLib = require('../lib/mongo');

class CategoriesService
{
  constructor()
  {
    this.collection = 'categories';
    this.mongoDB = new MongoLib();
  }

  async getCategories()
  {
    const query = {};
    const categories = await this.mongoDB.getAll(this.collection, query);
    return categories || [];
  }

  async getCategory({ categoryId })
  {
    const category = await this.mongoDB.get(this.collection, categoryId);
    return category || {};
  }

  async createCategory({ category })
  {
    const createdCategory = await this.mongoDB.create(this.collection, category);
    return createdCategory;
  }

  async updateCategory({ categoryId, category } = {})
  {
    const updatedCategory = await this.mongoDB.update(this.collection, categoryId, category);
    return updatedCategory;
  }

  async deleteCategory({ categoryId })
  {
    const deletedCategoryId = await this.mongoDB.delete(this.collection, categoryId);
    return deletedCategoryId;
  }
}

module.exports = CategoriesService;