const express = require('express');
const router = express.Router();
const fileController = require('../../../controllers/student_stat.controller');

router.get('/', fileController.getAllStudentStat);

module.exports = router;
