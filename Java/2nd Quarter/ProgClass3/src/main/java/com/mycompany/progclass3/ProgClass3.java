
package com.mycompany.progclass3;

import java.util.Scanner;

public class ProgClass3 {

    public static void main(String[] args) {
        Circle c1 = new Circle();
        
        System.out.println(c1.calcArea());
        
        c1.increaseRadius(3);        
        System.out.println(c1.calcArea());
        
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Please enter the number of circles ");
        
        Circle[] circles = new Circle[sc.nextInt()];
        
        for(int i=0; i<circles.length; i++) {
            System.out.println("Please enter the radius ");
            
            circles[i] = new Circle(sc.nextInt());
            
            System.out.println("Area of the circle "+i+circles[i].calcArea());
        }
    }
}
