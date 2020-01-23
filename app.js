const express = require('express');
// const db = require('./data/db');
import bodyParser from 'body-parser';
import db from './data/db';
const cors = require('cors');

const app = express();

app.use(cors());
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// GET BY ID
app.get('/api/test/partners/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((partners) => {
    if (partners.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'retrieved successfully',
        partners,
      	});
    	} 
	});
 return res.status(404).send({
   success: 'false',
   message: 'Partner does not exist',
  });
});

app.get('/api/test/partners', (req, res) => {
  res.status(200).send({
    partners: db
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});