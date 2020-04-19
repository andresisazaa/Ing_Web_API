const httpStatus = require('http-status');
const Student = require('./student');
const helper = require('./student.util');


const getStudentsCtr = async (req, res) => {
  try {
    const studentsList = await Student.getStudents();
    return res
      .status(httpStatus.OK)
      .send(studentsList)
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};


const getStudentByIdCtr = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.getStudentById(id);
    if (!student) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: `Student with id: ${id} not found` });
    } else if (student) {
      return res
        .status(httpStatus.OK)
        .send(student);
    }
  } catch (error) {
    if (error.message === 'Invalid id') {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.message })
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};


const createStudentCtr = async (req, res) => {
  const { body } = req;
  try {
    const newStudent = await Student.createStudent(body);
    if (!newStudent) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Cannot create Student' });
    } else if (newStudent) {
      return res
        .status(httpStatus.OK)
        .send(newStudent);
    }
  } catch (error) {
    if (error.name === 'MongoError') {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.errmsg });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};


const updatedStudentCtr = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedStudent = await Student.updateStudent(id, body);
    if (!updatedStudent) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Student not found' });
    } else if (updatedStudent) {
      return res
        .status(httpStatus.OK)
        .send(updatedStudent);
    }
  } catch (error) {
    console.log(error);
    
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};


const deleteStudentCtr = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudentId = await Student.deleteStudent(id);
    return res
      .status(httpStatus.OK)
      .send({ message: `Student with id: ${deletedStudentId} was deleted` });
  } catch (error) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: error.message });
  }
};


const getAverageCtr = async (req, res) => {
  try {
    const average = await Student.calculateAverage();
    return res
      .status(httpStatus.OK)
      .send({ average });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};


const updateGradeCtr = async (req, res) => {
  const { body } = req;
  const { rule, currentGrade, newGrade } = body;
  const validRule = helper.validateRule(rule);
  if (!validRule) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: `Rule ${rule} doesn't exist` })
  }
  const validGrades = helper.validateGrade(currentGrade) && helper.validateGrade(newGrade);
  if (!validGrades) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'The grades are not valid' })
  }
  try {
    const updatedStudents = await Student.updateGrade(rule, currentGrade, newGrade);
    return res
      .status(httpStatus.OK)
      .send({
        message: 'Students updated successfully',
        rule: `${rule} ${newGrade}`,
        students: updatedStudents
      });
  } catch (error) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: error.message });
  }
}

module.exports = {
  getStudentsCtr,
  getStudentByIdCtr,
  createStudentCtr,
  updatedStudentCtr,
  deleteStudentCtr,
  getAverageCtr,
  updateGradeCtr
};