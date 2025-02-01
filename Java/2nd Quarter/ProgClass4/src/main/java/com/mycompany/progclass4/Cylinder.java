package com.mycompany.progclass4;

/* sam008: Cylinder.java
 *
 * Inheritance and Method Overriding
 *
 * This class is incomplete and will not compile as there is missing code!
 */

public class Cylinder extends Circle
{
    private double length;

    // default constructor
    public Cylinder() {
        length = 1.0; // default length of 1.0
    }


    public Cylinder(double aRadius, double aLength) {
        super(aRadius);
        this.length = aLength;   // default length of 1.0
    }


    // getter method for length
    public double getLength()
    {
        return length;
    }

    public double calcVolume()
    {
        return super.calcArea()*length;
    }

    @Override
    public double calcArea()    {
        return 2*super.calcArea()+(2*getRadius()*Math.PI)*length;
    }

}