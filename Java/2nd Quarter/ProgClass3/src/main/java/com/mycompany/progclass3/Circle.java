
package com.mycompany.progclass3;


public class Circle {
    
    // Variables
    private int radius;
    
    // Constructor
    public Circle() {
        radius = 3;        
    }
    
    // Secondary Constructor
    public Circle(int radius) {
        this.radius = radius;
    }
    
    
    // Methods
    public void increaseRadius(int increase) {
        radius += increase;
    }
    
    public double calcArea(){
        return Math.PI * (radius * radius);
    }
}
