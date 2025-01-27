/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.progclass2;

import java.awt.Rectangle;
public class Rects {
    public static void main(String[] args) {
        Rectangle rec = new Rectangle(4, 12, 10, 28);
    
        System.out.println("Rec 1 X location is "+rec.getX());
        System.out.println("Rec 1 Y location is "+rec.getY());
        System.out.println("Rec 1 Width is "+rec.getWidth());
        System.out.println("Rec 1 Height is "+rec.getHeight());
        
        System.out.println("");
        Rectangle rec2 = new Rectangle(40, 10, 45, 100);
    
        System.out.println("Rec 2 X location is "+rec2.getX());
        System.out.println("Rec 2 Y location is "+rec2.getY());
        System.out.println("Rec 2 Width is "+rec2.getWidth());
        System.out.println("Rec 2 Height is "+rec2.getHeight());
        
        System.out.println("");
        Rectangle rec3 = new Rectangle(6, 4, 10, 20);
    
        System.out.println("Rec 3 X location is "+rec3.getX());
        System.out.println("Rec 3 Y location is "+rec3.getY());
        System.out.println("Rec 3 Width is "+rec3.getWidth());
        System.out.println("Rec 3 Height is "+rec3.getHeight());
    }
    
    
    
}
