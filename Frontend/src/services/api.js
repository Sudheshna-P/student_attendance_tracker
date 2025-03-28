import axios from 'axios';

const API_URL = "http://localhost:8084/attendance"; // Adjust based on backend URL

// Fetch attendance for a specific student
export const getStudentAttendance = async (rollNo) => {
    try {
        const response = await fetch(`${API_URL}/student/${rollNo}`, {
            method: "GET", // Change method to GET (PUT doesn't make sense for fetching data)
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Return JSON response
    } catch (error) {
        console.error("Error fetching student attendance:", error);
        throw error;
    }
};



// Mark attendance (faculty only)
export const markAttendance = (data) => {
    return axios.post(`${API_URL}/mark`, data);
};

// Get absentees for a given date
export const getAbsenteesByDate = (date) => {
    return axios.get(`${API_URL}/absentees/${date}`);
};

// Get students who have exceeded absence limit
export const getDefaulters = (limit) => {
    return axios.get(`${API_URL}/defaulters/${limit}`);
};
