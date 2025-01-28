package com.mycompany.zooapp;

import java.util.Date;
import java.util.HashMap;


public class Fish extends Animal {
    public Fish(String name, 
                       String species, 
                       String habitat, 
                       Date dateOfBirth, 
                       double weight,
                       HashMap comments) {
        super(name, species, habitat, dateOfBirth, weight, comments);
        
}
}
