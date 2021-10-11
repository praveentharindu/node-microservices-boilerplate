const express = require('express');

// back in our API router
const router = express.Router();

/**
 * Routes imports
 */
const studentStatRoutes = require('./v1/student_stat.routes');

router.use('/student_stat', studentStatRoutes);

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    status: 'success',
    message: 'Student Stat Service API 2',
    data: { version_number: 'v1.0.0' }
  });
});

module.exports = router;
