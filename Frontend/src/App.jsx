import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentProfile from './pages/StudentProfile';
import FacultyAttendance from './pages/FacultyAttendance';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <Link className="navbar-brand" to="/">Attendance System</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/student">Student Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/faculty">Faculty Attendance</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<h2>Welcome to the Attendance System</h2>} />
                    <Route path="/student" element={<StudentProfile />} />
                    <Route path="/faculty" element={<FacultyAttendance />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
