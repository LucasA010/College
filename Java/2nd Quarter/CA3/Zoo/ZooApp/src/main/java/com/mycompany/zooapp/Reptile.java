package com.mycompany.zooapp;

import java.util.Date;
import java.util.HashMap;


public class Reptile extends Animal{
    
    public Reptile(String name, 
                String species, 
                String habitat, 
                Date dateOfBirth, 
                double weight,
                HashMap comments,
                String className) {
        super(name, species, habitat, dateOfBirth, weight, comments, className);
        
}
}
