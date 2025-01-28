package com.mycompany.zooapp;

import java.util.Date;
import java.util.HashMap;


public class Bird extends Animal{
    public Bird(String name, 
                       String species, 
                       String habitat, 
                       Date dateOfBirth, 
                       double weight,
                       HashMap comments) {
        super(name, species, habitat, dateOfBirth, weight, comments);
        
}
}
