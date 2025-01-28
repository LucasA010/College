package com.mycompany.zooapp;

import java.util.Date;
import java.util.HashMap;


public class Mammal extends Animal{
    public Mammal(String name, 
                       String species, 
                       String habitat, 
                       Date dateOfBirth, 
                       double weight,
                       HashMap comments) {
        super(name, species, habitat, dateOfBirth, weight, comments);
        
}
}
