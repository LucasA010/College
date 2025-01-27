
package com.mycompany.progclass3;


public class StudentApp {
    public static void main(String[] args) {
        Student stu1 = new Student();
        
        System.out.println(stu1.getName());
        
        stu1.addCredits(15);
        System.out.println(stu1.getCredits());
    }
}
