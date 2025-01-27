
package com.mycompany.progclass3;


public class Student {
    
    // Variables
    private String name;
    private String studentID;
    private int credits;
    
    // Constructor
    public Student() {
        name = "John Doe";
        studentID = "CCT001";
        credits = 0;
    }
    
    public Student(String name, String studentID, int credits) {
        this.name = name;
        this.studentID = studentID;
        this.credits = credits;
    }
    
    // Getters and Setters
    public String getName(){
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getStudentID() {
        return studentID;
    }
    
    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }
    
    public int getCredits() {
        return credits;
    }
    
    public void addCredits(int credits) {
        this.credits += credits;
    }
    
    
}
