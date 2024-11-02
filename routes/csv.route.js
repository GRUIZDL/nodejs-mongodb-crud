const express = require('express');
const router = express.Router();
const { guardarCsvMongo } = require('../controllers/csv.controller.js');

router.get("/guardar", guardarCsvMongo);

module.exports = router;