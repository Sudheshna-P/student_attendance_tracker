import React, { useEffect, useState } from 'react';
import { getStudentAttendance } from '../services/api';

const StudentProfile = () => {
    const [rollNo, setRollNo] = useState('');
    const [attendance, setAttendance] = useState([]);

    const fetchAttendance = async () => {
        if (!rollNo) return;
        try {
            const response = await getStudentAttendance(rollNo);
            setAttendance(response.data);
        } catch (error) {
            console.error("Error fetching attendance", error);
            alert("Failed to load attendance data");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Student Attendance History</h2>
            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Enter Roll Number" 
                value={rollNo} 
                onChange={(e) => setRollNo(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={fetchAttendance}>View Attendance</button>
            
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Hour</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? (
                        attendance.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.hour}</td>
                                <td className="text-danger">Absent</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3" className="text-center">No attendance records</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentProfile;
