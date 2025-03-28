package com.example.attendance.controller;

import com.example.attendance.dto.AttendanceRequest;
import com.example.attendance.model.Attendance;
import com.example.attendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // ✅ Mark attendance
    @PostMapping("/mark")
    public ResponseEntity<String> markAttendance(@RequestBody AttendanceRequest request) {
        attendanceService.markAttendance(request.getDate(), request.getHour(), request.getAbsentees());
        return ResponseEntity.ok("Attendance marked successfully!");
    }

    // ✅ Get attendance for a specific date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(@PathVariable String date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(LocalDate.parse(date)));
    }

    // ✅ Get students with more than 3 absences (Defaulters)
    @GetMapping("/defaulters")
    public ResponseEntity<List<String>> getDefaulters() {
        return ResponseEntity.ok(attendanceService.getDefaulters());
    }

    // ✅ Get attendance record for a specific student
    @GetMapping("/student/{rollNo}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable String rollNo) {
        return ResponseEntity.ok(attendanceService.getStudentAttendance(rollNo));
    }
}
