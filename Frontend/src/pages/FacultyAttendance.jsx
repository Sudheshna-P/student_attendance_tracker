import React, { useState } from 'react';
import { markAttendance, getAbsenteesByDate, getDefaulters } from '../services/api';

const FacultyAttendance = () => {
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [absentees, setAbsentees] = useState('');

    const [absenteeDate, setAbsenteeDate] = useState('');
    const [absenteeList, setAbsenteeList] = useState([]);

    const [absenceLimit, setAbsenceLimit] = useState('');
    const [defaulters, setDefaulters] = useState([]);

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        const absenteesList = absentees.split(',').map(item => item.trim());
        const data = { date, hour, absentees: absenteesList };

        try {
            await markAttendance(data);
            alert('Attendance marked successfully!');
            setDate('');
            setHour('');
            setAbsentees('');
        } catch (error) {
            alert('Error marking attendance!');
        }
    };

    const fetchAbsentees = async () => {
        try {
            const response = await getAbsenteesByDate(absenteeDate);
            setAbsenteeList(response.data);
        } catch (error) {
            alert('Error fetching absentees.');
        }
    };

    const fetchDefaulters = async () => {
        try {
            const response = await getDefaulters(absenceLimit);
            setDefaulters(response.data);
        } catch (error) {
            alert('Error fetching defaulters.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Faculty Attendance Panel</h2>

          
            <form onSubmit={handleMarkAttendance}>
                <h4>Mark Attendance</h4>
                <div className="mb-3">
                    <label className="form-label">Date:</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hour:</label>
                    <input type="number" className="form-control" value={hour} onChange={(e) => setHour(e.target.value)} min="1" max="7" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Absentees (Roll Numbers, comma separated):</label>
                    <input type="text" className="form-control" value={absentees} onChange={(e) => setAbsentees(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>

            <hr />

       
            <h4>View Absentees on a Date</h4>
            <input type="date" className="form-control mb-3" value={absenteeDate} onChange={(e) => setAbsenteeDate(e.target.value)} />
            <button className="btn btn-primary" onClick={fetchAbsentees}>Fetch Absentees</button>
            <ul className="list-group mt-3">
                {absenteeList.length > 0 ? absenteeList.map((student, index) => (
                    <li key={index} className="list-group-item">{student}</li>
                )) : <li className="list-group-item">No data available</li>}
            </ul>

            <hr />

        
            <h4>View Defaulters (More than X Absences)</h4>
            <input type="number" className="form-control mb-3" value={absenceLimit} onChange={(e) => setAbsenceLimit(e.target.value)} />
            <button className="btn btn-danger" onClick={fetchDefaulters}>Fetch Defaulters</button>
            <ul className="list-group mt-3">
                {defaulters.length > 0 ? defaulters.map((student, index) => (
                    <li key={index} className="list-group-item">{student}</li>
                )) : <li className="list-group-item">No data available</li>}
            </ul>
        </div>
    );
};

export default FacultyAttendance;
