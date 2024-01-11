import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import api from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudents = async () => {
    try {
      const fetchedStudents = await api.getStudents(searchQuery);
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await api.deleteStudent(studentId);
      fetchStudents();
      console.log('Student deleted successfully.');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-100 py-4 px-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Students List</h2>
              <Link to="/create" className="text-green-500 hover:text-green-700 flex items-center">
                <IoIosAddCircle className="mr-2" />
                Add Student
              </Link>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by name"
                className="border p-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{student.firstName}</td>
                  <td className="py-2 px-4 border-b">{student.lastName}</td>
                  <td className="py-2 px-4 border-b">{student.age}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center justify-center">
                      <Link
                        to={`/edit/${student.id}`}
                        className="text-blue-500 hover:text-blue-700 mr-5"
                      >
                        <FaUserEdit className="w-5 h-5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(student.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
