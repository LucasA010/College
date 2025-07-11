package com.mycompany.zooapp;

import java.util.Date;
import java.util.HashMap;


public class Animal {
    
    // Variables
    private String name;
    private String species;
    private String habitat;
    private Date dateOfBirth;
    private double weight;
    private HashMap<String, String> comments;
    private String className;
    
    // Contructor
    public Animal(String name, 
                  String species, 
                  String habitat, 
                  Date dateOfBirth, 
                  double weight,
                  HashMap<String, String> comments,
                  String className) {
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
        this.comments = (HashMap<String, String>) comments.clone();
        this.className = className;
    
    // Constructor with comments variable
    
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public HashMap<String, String> getComments() {
        return this.comments;
    }

    public void setComments(HashMap<String, String> comments) {
        this.comments = comments;
    }
    
    
}
