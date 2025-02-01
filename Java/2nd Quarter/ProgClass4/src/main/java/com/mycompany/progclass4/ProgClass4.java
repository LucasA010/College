/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.progclass4;

/**
 *
 * @author lucru
 */
public class ProgClass4 {

    public static void main(String[] args) {
        Lecturer lecture = new Lecturer("David");
        
        LecturerPartTime lecturerPart = new LecturerPartTime(22, "Part");
        
        LecturerFullTime lecturerFull = new LecturerFullTime(44000, "Full");
                
        System.out.println(lecture.getName());
        
        
        Fruit fruit = new Fruit(1);
        
        Apple apple = new Apple("Premium", 2);
        
        Banana banana = new Banana(3, 4);
        
        System.out.println("\n\n\n");
        
        System.out.println("Fruit: " + fruit.getWeight()  );
                
        System.out.println("Apple: " + apple.getWeight() + " variety: " + apple.getVariety());
        
        System.out.println("Banana: " + banana.getWeight() + " lenght: " + banana.getLength());
        
        System.out.println(banana.toString());
        
    }
}
