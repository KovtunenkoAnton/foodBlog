var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer');
const path = require('path');
const recipes = [
  // {
  //     title: 'Яичница',
  //     id: uuidv4(),
  //     ingredients: ['Яйца - 6 шт', 'Колбаса - 2 кусочка', 'Зелень - пучок', 'Масло - кусочек'],
  //     recipeText: "Слегка прогрейте сковородку. Влейте растительное масло или растопите сливочное. После этого выключите газ на 30–40 секунд или переставьте ёмкость на холодную конфорку — благодаря этому посуда не перегреется и яйца прожарятся равномерно. Хотя если вы любите хрустящие края, этот шаг можно пропустить.Аккуратно добавьте яйца. Можно разбить их сразу над сковородой или же в небольшую отдельную ёмкость, перелив затем в сковороду."
  // },
]

const upload = multer({ dest: '../client/public/uploads' });

router.route('/')
  .get(function (req, res) {
    res.json(recipes);
  })
  .post(upload.array('images'), function (req, res) {
    const createdRecipe = JSON.parse(req.body.text);
    createdRecipe.id = uuidv4();

    const images = [];
    req.files.length && req.files.forEach(image => images.push(image.filename));
    createdRecipe.images = images;

    recipes.push(createdRecipe);
    res.json(createdRecipe);
  })

module.exports = router;
