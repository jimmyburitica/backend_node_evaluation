const express = require('express');
const CategoriesService = require('../services/categories');
const ProductsService = require('../services/products');

// recibe una app de Express
function categoriesApi(app)
{
  const router = express.Router();
  app.use('/api/categories', router);

  const categoriesService = new CategoriesService();
  const productsService = new ProductsService();

  // Traer todos las categorias
  router.get('/', async function (req, res, next)
  {
    try {
      const categories = await categoriesService.getCategories({});
      res.status(200).send(categories);
    } catch (err) {
      next(err);
    }
  });

  // Mostrar una categoria
  router.get('/:categoryId', async function (req, res, next)
  {
    const { categoryId } = req.params;

    try {
      const categories = await categoriesService.getCategory({ categoryId });
      res.status(200).send(categories);
    } catch (err) {
      next(err);
    }
  });

  // Crear una categoria
  router.post('/', async function (req, res, next)
  {
    const { body: category } = req;
    try {
      const createdCategory = await categoriesService.createCategory({ category });
      res.status(201).send(createdCategory);
    } catch (err) {
      next(err);
    }
  });

  // Actualizar una categoria
  router.put('/:categoryId', async function (req, res, next)
  {
    const { categoryId } = req.params;
    const { body: category } = req;

    try {
      const updatedCategory = await categoriesService.updateCategory({ categoryId, category });
      res.status(200).send(updatedCategory);
    } catch (err) {
      next(err);
    }
  });

  // Borrar una categoria
  router.delete('/:categoryId', async function (req, res, next)
  {
    const { categoryId } = req.params;

    try {
      const deletedCategoryId = await categoriesService.deleteCategory({ categoryId });
      res.status(200).send(true);
    } catch (err) {
      next(err);
    }
  });

  // Mostrar productos de una categoria
  router.get('/:categoryId/products', async function (req, res, next)
  {
    const { categoryId } = req.params;

    try {
      const products = await productsService.getProducts({ categoryId });
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = categoriesApi;
