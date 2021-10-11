const mongoose = require('mongoose');

const StudentStat = mongoose.Schema({
  student_id: {
    type: String,
    required: true
  },
  student_name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  mark: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('StudentStat', StudentStat);
