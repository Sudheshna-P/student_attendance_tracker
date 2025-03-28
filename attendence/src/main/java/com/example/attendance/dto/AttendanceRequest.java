package com.example.attendance.dto;

import java.time.LocalDate;
import java.util.List;

public class AttendanceRequest {
    private LocalDate date;
    private int hour;
    private List<String> absentees;

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getHour() { return hour; }
    public void setHour(int hour) { this.hour = hour; }

    public List<String> getAbsentees() { return absentees; }
    public void setAbsentees(List<String> absentees) { this.absentees = absentees; }
}
