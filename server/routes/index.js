var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const DB = [
  { title: 'first', id: uuidv4(), text: 'some text' }, 
  { title: 'second', id: uuidv4(), text: 'some text' },
  { title: 'third', id: uuidv4(), text: 'some text' }
]

router.route('/')
  .get(function (req, res) {
    res.json(DB)
  })

module.exports = router;
