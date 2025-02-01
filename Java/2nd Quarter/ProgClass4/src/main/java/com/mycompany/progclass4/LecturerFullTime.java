/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.progclass4;

/**
 *
 * @author lucru
 */
public class LecturerFullTime extends Lecturer{
    private double salary;

    public LecturerFullTime(double salary) {
        this.salary = salary;
    }

    public LecturerFullTime(double salary, String name) {
        super(name);
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
