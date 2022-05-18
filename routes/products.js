const express = require('express');
const fs = require('fs');
const { Router } = express;
const router = new Router();

router.use(express.json());
router.use(express.urlencoded({ decode: true }));

router.get('/:id', (req, res) => {
  if (req.params.id) {
    fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
      if (err) {
        console.log('Error al leer');
      }
      res.render('../views/products/index.ejs', { data: JSON.parse(data) });
    });
  } else {
    fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
      if (err) {
        console.log('Error al leer');
      }
      let obj = JSON.parse(data).find((x) => {
        return x.id === req.params.id;
      });
      res.render('../views/products/index.ejs', { data: obj });
    });
  }
});

router.get('/form', (req, res) => {
  res.render('../views/products/form');
});

router.post('/', (req, res) => {
  fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('Error al leer');
    }
    JSON.parse(data).push(req.body);
    res.render('../views/products/cargado');
  });
});

router.put('/cambiar/:id', (req, res) => {
  let id = req.params.id - 1;

  let jsonData = fs.readFileSync('/products.json');
  let data = JSON.parse(jsonData);

  data[id]['name'] = req.body.name;
  data[id]['price'] = req.body.price;
  data[id]['img'] = req.body.img;

  fs.writeFileSync('/products.json', JSON.stringify(data));
  res.json(data);
});

router.delete('/', () => {});

module.exports = router;
