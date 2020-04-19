const Student = require('./student.model');
const util = require('./student.util');

const getStudents = async () => {
  const students = await Student.find({}).exec();
  return students;
}

const getStudentById = async (id) => {
  try {
    const student = await Student.findById(id).exec();
    return student;
  } catch (error) {
    throw new Error('Invalid id');
  }
}

const createStudent = async (body) => {
  const studentData = { ...body };
  const createdStudent = await Student.create(studentData);
  return createdStudent;
}

const updateStudent = async (id, body) => {
  const studentData = { ...body };
  const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true }).exec();
  return updatedStudent;
}

const updateStudentByGrade = async (id, newGrade) => {
  const updatedStudent = await Student.findOneAndUpdate(id, { grade: newGrade }, { new: true }).exec();
  return updatedStudent;
}

const deleteStudent = async (id) => {
  const deletedStudent = await Student.findByIdAndRemove(id).exec();
  if (deletedStudent) {
    const { _id: deletedStudentId } = deletedStudent;
    return String(deletedStudentId);
  } else {
    throw new Error(`Cannot delete student with id: ${id} (not found)`);
  }
};

const calculateAverage = async () => {
  const students = await getStudents();
  if (students.length > 0) {
    const grades = students.map(s => s.grade);
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    return sum / students.length;
  } else if (students.length === 0) {
    return new Error('Cannot get average without students');
  }
}

const updateGrade = async (rule, currentGrade, newGrade) => {
  const students = await getStudents();
  if (students.length === 0) {
    throw new Error('Students not found');
  }
  const studentsToUpdate = util.getStudentsToUpdate(students, rule, currentGrade);
  if (studentsToUpdate.length === 0) {
    throw new Error(`No students were found to apply the rule ${rule} ${currentGrade}`);
  }
  const studentsPromises = studentsToUpdate.map(s => updateStudentByGrade(s.id, newGrade));
  const updatedStudents = await Promise.all(studentsPromises);
  return updatedStudents;
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  calculateAverage,
  updateGrade
};
