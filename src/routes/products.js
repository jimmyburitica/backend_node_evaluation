const express = require('express');
const ProductsService = require('../services/products');

// recibe una app de Express
function productsApi(app)
{
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  // Traer todos los productos
  router.get('/', async function (req, res, next)
  {
    try {
      const products = await productsService.getProducts({ });
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  });

  // Mostrar un producto
  router.get('/:productId', async function (req, res, next)
  {
    const { productId } = req.params;

    try {
      const products = await productsService.getProduct({ productId });
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  });

  // Crear un producto
  router.post('/', async function (req, res, next)
  {
    const { body: product } = req;

    try {
      const createdProduct = await productsService.createProduct({ product });
      res.status(201).send(createdProduct);
    } catch (err) {
      next(err);
    }
  });

  // Actualizar un producto
  router.put('/:productId', async function (req, res, next)
  {
    const { productId } = req.params;
    const { body: product } = req;

    try {
      const updatedProductId = await productsService.updateProduct({ productId, product });
      res.status(200).send(updatedProductId);
    } catch (err) {
      next(err);
    }
  });

  // Borrar un producto
  router.delete('/:productId', async function (req, res, next)
  {
    const { productId } = req.params;

    try {
      const deletedProductId = await productsService.deleteProduct({ productId });
      res.status(200).send(true);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productsApi;
