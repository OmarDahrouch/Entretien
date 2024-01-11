const { sequelize } = require('../database');
const Student = require('../models/Student'); 
const { calculateAge } = require('../helper/StudentFunctions.');
const { Op } = require('sequelize');


// Create student
const createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};


// Get all students 
const getAllStudents = async (req, res) => {
  try {
    let data;
    const { searchQuery } = req.query;

    if (searchQuery) {
      data = await Student.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: `%${searchQuery}%` } },
            { lastName: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
      });
    } else {
      data = await Student.findAll();
    }

    const students = await Promise.all(
      data.map(async (student) => {
        const age = await calculateAge(student.dateOfBirth);
        const fullName = `${student.firstName} ${student.lastName}`;
        return {
          ...student.toJSON(),
          age,
          fullName,
        };
      })
    );

    console.log(students);
    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error during the retrieval of students' });
  }
}

// Get method with Pagination included 

  // async function getAllStudents(req, res) {
//   try {
//     let { searchQuery, page, pageSize } = req.query;
//     page = parseInt(page) || 1;
//     pageSize = parseInt(pageSize) || 10;

//     let whereClause = {};

//     if (searchQuery) {
//       whereClause = {
//         [Op.or]: [
//           { firstName: { [Op.iLike]: `%${searchQuery}%` } },
//           { lastName: { [Op.iLike]: `%${searchQuery}%` } },
//         ],
//       };
//     }

//     const offset = (page - 1) * pageSize;

//     const data = await Student.findAndCountAll({
//       where: whereClause,
//       offset,
//       limit: pageSize,
//     });

//     const studentsWithAge = await Promise.all(
//       data.rows.map(async (student) => {
//         const age = await calculateAge(student.dateOfBirth);
//         return { ...student.toJSON(), age };
//       })
//     );

//     res.json({
//       students: studentsWithAge,
//       totalStudents: data.count,
//     });
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: 'Error during the retrieval of students' });
//   }
// }


// Get student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Update student
const updateStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      res.status(404).send('Student not found');
      return;
    }

    const { firstName, lastName, dateOfBirth, email } = req.body;
    await student.update({ firstName, lastName, dateOfBirth, email });

    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudentCount = await Student.destroy({
      where: { id },
    });
    if (deletedStudentCount === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
