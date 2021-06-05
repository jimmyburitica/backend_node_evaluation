const express = require('express');
const cors = require('cors');

const categoriesApi = require('./routes/categories')
const productsApi = require('./routes/products')

function createApp() { 
  const app = express();
  app.use(cors());
  app.use(express.json());

  // ADD YOUR ROUTES
  categoriesApi(app);
  productsApi(app);

  return app;
}

module.exports = createApp;
