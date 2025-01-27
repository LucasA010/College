
package com.mycompany.ca3;


public class Animal {
    
    // Variables
    private String name;
    private String species;
    private String habitat;
    private String dateOfBirth;
    private double weight;
    private String comments;
    
    // Contructor
    public void Animal(String name, 
                       String species, 
                       String habitat, 
                       String DoB, 
                       double weight) {
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
    }
    
    // Constructor with comments variable
    public void Animal(String name, 
                       String species, 
                       String habitat, 
                       String DoB, 
                       double weight,
                       String comments) {
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
        this.comments = comments;
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    
    
}
