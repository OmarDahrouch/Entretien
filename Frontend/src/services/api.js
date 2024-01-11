const URL = 'http://localhost:5000';

const api = {
  
  getStudents: async (searchQuery) => {
    try {
      const response = await fetch(`${URL}/students${searchQuery ? `?searchQuery=${searchQuery}` : ''}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching students:', error.message);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    const response = await fetch(`${URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return response.json();
  },

  getStudentById: async (studentId) => {
    const response = await fetch(`${URL}/students/${studentId}`);
    return response.json();
  },

  updateStudent: async (studentId, studentData) => {
    const response = await fetch(`${URL}/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return response.json();
  },

  deleteStudent: async (studentId) => {
    const response = await fetch(`${URL}/students/${studentId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export default api;
