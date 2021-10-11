const StudentStatModel = require('../models/student_stat.model');

class StudentStatService {
  async createStat(schedule) {
    return await StudentStatModel.insertMany(schedule);
  }

  async getAllStudentStat(filters) {
    const aggregateMatch = {};

    if (filters.student_id !== undefined)
      aggregateMatch.student_id = filters.student_id;

    if (filters.subject !== undefined) aggregateMatch.subject = filters.subject;

    if (filters.year !== undefined)
      aggregateMatch.year = parseInt(filters.year);

    const pipeline = [
      {
        $match: aggregateMatch
      }
    ];

    return new Promise((resolve, reject) => {
      const aggregateInstance = StudentStatModel.aggregate(pipeline);
      aggregateInstance.exec((err, docs) => {
        if (err) reject(err);
        console.log('docs', docs);
        resolve([docs]);
      });
    });
  }
}

module.exports = new StudentStatService();
