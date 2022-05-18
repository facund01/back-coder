const express = require('express');
const fs = require('fs');
const { Router } = express;
const router = new Router();

router.get('/', (req, res) => {
  res.render('views/cart/index.ejs');
});

router.post('/:id/productos/:idCarrito', (req, res) => {
  fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('Error al leer');
    }
    res.render('../views/products/index.ejs', { data: JSON.parse(data) });
    let arr = JSON.parse(data);
    let objSelected = arr.find((x) => {
      return x.id === req.params.id;
    });

    fs.readFile(__dirname + '/cart.json', 'utf-8', (err, data) => {
      if (err) {
        console.log('Error al leer');
      }

      let arr = JSON.parse(data);
      let cartSelected = arr.find((x) => {
        return x.id === req.params.id;
      });
      cartSelected.productos.push(objSelected);
      arr.push(objSelected);
      fs.writeFile('/cart.json', JSON.stringify(arr), 'utf-8', (err) => {
        if (err) {
          console.log('Error');
        }
      });
    });
  });
});

router.post('/', () => {});

router.delete('/', () => {});

router.delete('/', () => {});

module.exports = router;
