package com.example.attendance.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNo;
    private LocalDate date;
    private int hour;
    private String status;  // "Present" or "Absent"

    public Attendance() {}

    public Attendance(String rollNo, LocalDate date, int hour, String status) {
        this.rollNo = rollNo;
        this.date = date;
        this.hour = hour;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getHour() { return hour; }
    public void setHour(int hour) { this.hour = hour; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
