package com.example.attendance.repository;

import com.example.attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(LocalDate date);
    Optional<Attendance> findByRollNoAndDateAndHour(String rollNo, LocalDate date, int hour);

    List<Attendance> findByRollNo(String rollNo);

    @Query("SELECT a.rollNo, COUNT(a) FROM Attendance a WHERE a.status = 'Absent' GROUP BY a.rollNo HAVING COUNT(a) > :limit")
    List<Object[]> findDefaulters(int limit);
}
