const express = require('express');
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/productos', productsRoute);
app.use('/carrito', cartRoute);

app.listen(8080, () => {
  console.log('Server Ok!');
});
