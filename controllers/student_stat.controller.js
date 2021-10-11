const {
  responseError,
  responseSuccess,
  ResponseCode
} = require('../services/util.service');
const studentStatService = require('../services/student_stat.service');

const getAllStudentStat = async (req, res) => {
  try {
    const filters = {
      ...req.query
    };
    const [files] = await studentStatService.getAllStudentStat(filters);
    return responseSuccess(
      res,
      {
        data: files
      },
      ResponseCode.SUCCESS_OK
    );
  } catch (ex) {
    console.log('ERROR: ', ex.message);
    return responseError(
      res,
      (ex.mapped && ex.mapped()) || ex.message,
      ResponseCode.UNPROCESSABLE_ENTITY
    );
  }
};

module.exports = {
  getAllStudentStat
};
