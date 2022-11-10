const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/sumArray', (req,res)=> {
  for (i=0 ;i<req.body.array.length;i++){
    
  }
  res.send({
    result: req.body.a + req.body.b,
  });
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
