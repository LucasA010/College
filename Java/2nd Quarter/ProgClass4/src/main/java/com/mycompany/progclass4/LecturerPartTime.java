/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.progclass4;

/**
 *
 * @author lucru
 */
public class LecturerPartTime extends Lecturer {
    private double hourlyRate;
    
    public LecturerPartTime() {
        super();
    }

    public LecturerPartTime(double hourlyRate, String name) {
        super(name);
        this.hourlyRate = hourlyRate;
    }

    public double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }
}
