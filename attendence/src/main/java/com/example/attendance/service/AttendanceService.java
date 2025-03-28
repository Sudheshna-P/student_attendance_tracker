package com.example.attendance.service;

import com.example.attendance.model.Attendance;
import com.example.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public void markAttendance(LocalDate date, int hour, List<String> absentees) {
        for (String rollNo : absentees) {
            Optional<Attendance> existingRecord = 
                attendanceRepository.findByRollNoAndDateAndHour(rollNo, date, hour);

            if (existingRecord.isPresent()) {
                // Update existing record
                Attendance attendance = existingRecord.get();
                attendance.setStatus("Absent");
                attendanceRepository.save(attendance);
            } else {
                // Insert new record
                Attendance newAttendance = new Attendance(rollNo, date, hour, "Absent");
                attendanceRepository.save(newAttendance);
            }
        }
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }


    public List<Attendance> getStudentAttendance(String rollNo) {
        return attendanceRepository.findByRollNo(rollNo);
    }

    public List<String> getDefaulters() {
        Map<String, Long> absentCount = attendanceRepository.findAll().stream()
                .collect(Collectors.groupingBy(Attendance::getRollNo, Collectors.counting()));

        return absentCount.entrySet().stream()
                .filter(entry -> entry.getValue() > 3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
