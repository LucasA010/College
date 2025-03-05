
package com.mycompany.zooapp;

import java.util.Arrays;
import java.util.Date;
import java.text.DateFormat;
import java.io.File;
import java.util.HashMap;
import java.util.Scanner;
import java.text.SimpleDateFormat;

public class ZooApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // File location, please change when receiving CA :)
        File animalsFile = new File("./src/main/resources/animals.txt");
        
        // functional variables
        int option; // menu option
        boolean cont = true; // terminate app
        boolean isRead = false; // check if data was valid to proccess objects
        int lineCounter = 0; // line tracking for error management
        int totalLines =0; // total of lines in txt file
        int linesPerAnimal = 4; // number of lines per animal, store in a variable in case need to change
        
        // Animal variables
        String type = "";
        String species = "";
        String name = "";
        String habitat = "";
        Date dateOfBirth = null;
        double weight = 0;
        HashMap<String, String> comments = new HashMap<String, String>(); // Hash map for comments of each animal
        // List of acceptable habitats
        String[] line2Check = {"jungle", "mountain", "desert", "ocean", "grass", "swamp", "snow", "tundra"};
        
        try { // try catch to get size of file
            Scanner fr = new Scanner(animalsFile); // Creating file reader object
            if (animalsFile.isFile()) {
                while (fr.hasNextLine()){totalLines++; fr.nextLine();}; // Getting total of lines
            }      
        } catch (Exception e){
            System.out.println("Line assignment failed");            
        }
        
        Animal[] animals = new Animal[totalLines/linesPerAnimal]; // Creating empty object list
        // first loop of surface menu
        do {
            System.out.println("Welcome to the Zoo App! Please choose one of the options below:\n"+
                                "\t1 - Read input file\n"+
                                "\t2 - Display all animal\n"+
                                "\t3 - Search animals by..\n"+
                                "\t9 - Quit the program");              
            System.out.print("Please input your option: ");
            
            // user input for menu
            option = sc.nextInt();
            
            // first switch with broader options
            switch (option) {
                case 1: // read input file
                    
                    // check if file exists
                    if (!animalsFile.isFile()) {
                        System.out.println("We couldn't find the file!\n"+
                                            "please make sure that is in the same directory and named as 'animals.txt'");
                    } else { // read file if it exists, otherwise curse the user
                        try {
                            Scanner fr = new Scanner(animalsFile);// Creating file reader object
                            while(fr.hasNextLine()) { // Loops until there aren't more lines in the file
                                boolean animalValid = true; // In case any data on animal is wrong the object will not be created
                                
                                for (int i=1; i<=linesPerAnimal; i++) {
                                    switch (i) {
                                        // validation for line 1
                                        case 1:
                                            String line1 = fr.nextLine(); // Getting data on line 1
                                            String[] line1Splitted = line1.split(","); // Splittign the data at the comme
                                            lineCounter++; // Incrementing line counter
                                            
                                            // Check if all data is there since there must be 3 elements
                                            if (line1Splitted.length != 3) {
                                                System.out.println("There are elements missing on line "+lineCounter+"."); 
                                                System.out.println("Please ensure that specifies type, species and name consecutively separeted by a comma");
                                            } else {
                                                for (int j=0; j<line1Splitted.length; j++) {
                                                    // Switch statement to validate each data separetely
                                                    switch(j) {
                                                        // Type validation
                                                        case 0: // type
                                                            // Selects first element of splitted line 
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z]+")) {
                                                                System.out.println("Type on line "+lineCounter+" is wrong");
                                                                animalValid = false;
                                                            } else { // if data is valid assign to type variable
                                                                type = line1Splitted[j];
                                                            } 
                                                            break;
                                                        // Species validation
                                                        case 1: // species
                                                            // Selects second element of splitted line
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z]+")) {
                                                                System.out.println("Species on line "+lineCounter+" is wrong");
                                                                animalValid = false;
                                                            } else { // if data is valid assign to species variable
                                                                species = line1Splitted[j];
                                                            }
                                                            break;
                                                        // Name validation
                                                        case 2: // name
                                                            // Selects third element of splitted line
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z0-9]+")) {
                                                                System.out.println("Name on line "+lineCounter+" is wrong");
                                                                animalValid = false;
                                                            } else { // if data is valid assign to name variable
                                                                name = line1Splitted[j];
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                            break;
                                            
                                        // validation for line 2
                                        case 2:
                                            // Getting next line
                                            String line2 = fr.nextLine();
                                            
                                            lineCounter++; //Incrementing line
                                            
                                            // Data check for habitats
                                            if (!line2.toLowerCase().strip().matches("[a-z]+")) {
                                                System.out.println("The habitat on line "+lineCounter+" has a typo");
                                                animalValid = false;
                                            } else if (!Arrays.asList(line2Check).contains(line2.toLowerCase())) { // Parsing array to list to see if contains habitat
                                                System.out.println("The habitat on "+lineCounter+" does not exist");
                                                animalValid = false;
                                            } else { // if data is valid assign to habitat variable
                                                habitat = line2;
                                            }
                                            break;
                                            
                                        // validation for line 3
                                        case 3:
                                            DateFormat dateCheck = new SimpleDateFormat("yyyy/MM/dd"); // Valid date format
                                            dateCheck.setLenient(false); // Allows only exact match
                                            
                                            // Getting data for line 3
                                            String line3 = fr.nextLine();
                                            lineCounter++; // Incrementing line
                                            
                                            // Splitting the line to separate elements
                                            String[] line3Splitted = line3.split(",");
                                            
                                            // Check if line contains all data since it must have 2 elements
                                            if (line3Splitted.length != 2) {
                                                System.out.println("Missing data on line "+lineCounter+".");
                                            } else {
                                                for (int k=0; k<line3Splitted.length; k++) {
                                                    // Switch statement for better visualisation
                                                    switch (k) {
                                                        case 0: // date of birth
                                                            // Try catch block on both outcomes to more simple check and response
                                                            // while already assigning values to proper variables
                                                            try { // if data is valid assign to date of birth variable
                                                                dateOfBirth = dateCheck.parse(line3Splitted[k]);
                                                            } catch (Exception e) {
                                                                System.out.println("Date on line "+lineCounter+" is incorrect");
                                                                animalValid = false;
                                                            }
                                                            break;
                                                        case 1: // weight
                                                            try { // if data is valid assign to weight variable, already parsing to double
                                                                weight = Double.parseDouble(line3Splitted[k]);
                                                            } catch (Exception e) {
                                                                System.out.println("weight on line "+lineCounter+" is incorrect");
                                                                animalValid = false;
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                            break;
                                            
                                        // validation for line 4
                                        case 4:
                                            // Getting data for line 4
                                            String line4 = fr.nextLine();
                                            lineCounter++; // Incrementing line
                                            
                                            // Splitting the data at the comma
                                            String[] line4Splitted = line4.split(",");
                                            
                                            // Since the data comes in pair it checks if anything is missing
                                            if (line4Splitted.length % 2 != 0) {
                                                System.out.println("There are elements missing on line "+lineCounter+" comments");
                                                animalValid = false;
                                            } else { // if all data is there then data is assignedto hash map, using a loop for 2 in 2
                                                if (!comments.isEmpty()) {
                                                    comments.clear();
                                                }
                                                for (int l=0; l<line4Splitted.length; l+=2) {
                                                    comments.put(line4Splitted[l], line4Splitted[l+1]);
                                                }
                                            }
                                            break;
                                    }
                                }
                                // assign variables and create proper objects in case all data is correct
                                if (animalValid) {
                                    
                                    switch (type.toLowerCase()){
                                        case "fish":
                                            animals[(lineCounter/linesPerAnimal)-1] = new Fish(name, species, habitat, dateOfBirth, weight, comments, "fish");
                                            System.out.println("Fish created");
                                            break;
                                            
                                        case "mammal":
                                            animals[(lineCounter/linesPerAnimal)-1] = new Mammal(name, species, habitat, dateOfBirth, weight, comments, "mammal");
                                            System.out.println("Mammal created");
                                            break;
                                            
                                        case "reptile":
                                            animals[(lineCounter/linesPerAnimal)-1] = new Reptile(name, species, habitat, dateOfBirth, weight, comments, "reptile");
                                            System.out.println("Reptile created");
                                            break;
                                            
                                        case "bird":
                                            animals[(lineCounter/linesPerAnimal)-1] = new Bird(name, species, habitat, dateOfBirth, weight, comments, "bird");
                                            System.out.println("Bird created");
                                            break;
                                        default:
                                            System.out.println("Noone created");
                                            break;
                                    }
                                }
                            }
                        } catch (Exception e) {
                            System.out.println("Something went bad"+e);
                        }
                        // signal that the file has been read and approved
                        isRead = true;
                    }
                    break;
                    
                case 2: // display all animals
                    // only avaible if file is read - IMPORTANT
                    // Loop to print all aniamsl
                    if (isRead) {
                        for (int i=0; i<animals.length; i++) { // Loop to print details of all animals in list
                            System.out.println((i+1)+" animal name is: "+animals[i].getName());
                            System.out.println("From the species: "+animals[i].getSpecies());
                            System.out.println("Its natural habitat being: "+animals[i].getHabitat());
                            System.out.println("Born at this date: "+animals[i].getDateOfBirth().toString().substring(0, 10));
                            System.out.println("Currently weighting: "+animals[i].getWeight());
                            System.out.println("Additional commentary for the animal below: ");
                            for (String l:animals[i].getComments().keySet()) {
                                System.out.println(l+": "+animals[i].getComments().get(l));
                            }
                            System.out.println("");
                        }
                    } else {
                        System.out.println("You need to read the input file first!");
                    }
                    break;
                    
                case 3: // search surface level
                    // only avaible if file is read - IMPORTANT
                    if (isRead) {
                            // only option with differente possibilities
                        int search;
                        // second loop for more precise search
                        System.out.println("Please input your search option: ");
                        do {
                            System.out.print("\t1 - Types..\n"+
                                             "\t2 - Habitat\n"+
                                             "\t3 - Name\n"+
                                             "\t4 - Species\n"+
                                             "\t9 - Previous menu\n");
                            // user input for search
                            search = sc.nextInt();

                            switch(search) {
                                case 1: // type; only option with more options
                                    int typeSearch;
                                    System.out.println("Please input the type you're looking for: ");
                                    // third loop 
                                    do {
                                        System.out.print("\t1 - Mammal\n"+
                                                        "\t2 - Bird\n"+
                                                        "\t3 - Reptile\n"+
                                                        "\t4 - Fish\n"+
                                                        "\t9 - Previous menu\n");
                                        // user input for types
                                        typeSearch = sc.nextInt();
                                        
                                        // third switch statement for type search
                                        switch(typeSearch) {
                                            case 1: // mammal search
                                                System.out.println(animals[0].getClass()+" this is snoopys name class");
                                                for (int i=0; i<animals.length; i++) { // Loop to print dall mammals
                                                    if (animals[i].getClassName().equals("mammal")) {
                                                        System.out.println((i+1)+" animal name is: "+animals[i].getName());
                                                        System.out.println("From the species: "+animals[i].getSpecies());
                                                        System.out.println("Its natural habitat being: "+animals[i].getHabitat());
                                                        System.out.println("Born at this date: "+animals[i].getDateOfBirth().toString().substring(0, 10));
                                                        System.out.println("Currently weighting: "+animals[i].getWeight());
                                                        System.out.println("Additional commentary for the animal below: ");
                                                        for (String l:animals[i].getComments().keySet()) {
                                                            System.out.println(l+": "+animals[i].getComments().get(l));
                                                        }
                                                        System.out.println("");
                                                    }
                                                }
                                                break;
                                            case 2: // bird search
                                                for (int i=0; i<animals.length; i++) { // Loop to print dall birds
                                                    if (animals[i].getClassName().equals("bird")) {
                                                        System.out.println((i+1)+" animal name is: "+animals[i].getName());
                                                        System.out.println("From the species: "+animals[i].getSpecies());
                                                        System.out.println("Its natural habitat being: "+animals[i].getHabitat());
                                                        System.out.println("Born at this date: "+animals[i].getDateOfBirth().toString().substring(0, 10));
                                                        System.out.println("Currently weighting: "+animals[i].getWeight());
                                                        System.out.println("Additional commentary for the animal below: ");
                                                        for (String l:animals[i].getComments().keySet()) {
                                                            System.out.println(l+": "+animals[i].getComments().get(l));
                                                        }
                                                        System.out.println("");
                                                    }
                                                }
                                                break;
                                            case 3: // reptile search
                                                for (int i=0; i<animals.length; i++) { // Loop to print dall reptiles
                                                    if (animals[i].getClassName().equals("reptile")) {
                                                        System.out.println((i+1)+" animal name is: "+animals[i].getName());
                                                        System.out.println("From the species: "+animals[i].getSpecies());
                                                        System.out.println("Its natural habitat being: "+animals[i].getHabitat());
                                                        System.out.println("Born at this date: "+animals[i].getDateOfBirth().toString().substring(0, 10));
                                                        System.out.println("Currently weighting: "+animals[i].getWeight());
                                                        System.out.println("Additional commentary for the animal below: ");
                                                        for (String l:animals[i].getComments().keySet()) {
                                                            System.out.println(l+": "+animals[i].getComments().get(l));
                                                        }
                                                        System.out.println("");
                                                    }
                                                }
                                                break;
                                            case 4: // fish search
                                                for (int i=0; i<animals.length; i++) { // Loop to print dall fishes
                                                    if (animals[i].getClassName().equals("fish")) {
                                                        System.out.println((i+1)+" animal name is: "+animals[i].getName());
                                                        System.out.println("From the species: "+animals[i].getSpecies());
                                                        System.out.println("Its natural habitat being: "+animals[i].getHabitat());
                                                        System.out.println("Born at this date: "+animals[i].getDateOfBirth().toString().substring(0, 10));
                                                        System.out.println("Currently weighting: "+animals[i].getWeight());
                                                        System.out.println("Additional commentary for the animal below: ");
                                                        for (String l:animals[i].getComments().keySet()) {
                                                            System.out.println(l+": "+animals[i].getComments().get(l));
                                                        }
                                                        System.out.println("");
                                                    }
                                                }
                                                break;
                                            case 9: // going one level above
                                                break;
                                            default: // data verification
                                            System.out.println("Please input correct option");
                                            break;
                                        }

                                    } while (typeSearch != 9);
                                    break;
                                case 2: // habitat search
                                    System.out.print("Please type the habitat that you're looking for: ");
                                    String habitatSearch = sc.next(); //habitat search input
                                    
                                    for(int i=0; i<animals.length; i++) { // loop to print inputed habitat
                                        if(animals[i].getHabitat().toLowerCase().equals(habitatSearch.toLowerCase())) {
                                            System.out.println(animals[i].getName()+" lives in this habitat!");
                                            System.out.println("He is a "+animals[i].getSpecies());
                                        } else if (!Arrays.asList(line2Check).contains(habitatSearch)){
                                            System.out.println("Habitat invalid");
                                        }
                                    }
                                    break;
                                case 3: // name search
                                    System.out.print("Please type the name that you're looking for: ");
                                    String nameSearch = sc.next(); //name search input
                                    
                                    for(int i=0; i<animals.length; i++) { // loop to print inputed name
                                        if(animals[i].getName().toLowerCase().equals(nameSearch.toLowerCase())) {
                                            System.out.println(animals[i].getName()+" lives in "+animals[i].getHabitat());
                                            System.out.println("He is a "+animals[i].getSpecies());
                                        }
                                    }
                                    break;
                                case 4: // species search
                                    System.out.print("Please type the habitat that you're looking for: ");
                                    String speciesSearch = sc.next(); //species search input
                                    for(int i=0; i<animals.length; i++) { // loop to print inputed species
                                        if(animals[i].getSpecies().toLowerCase().equals(speciesSearch.toLowerCase())) {
                                            System.out.println(animals[i].getName()+" is a "+animals[i].getSpecies());
                                            System.out.println("He lives in "+animals[i].getHabitat()+" habitat");
                                        }
                                    }
                                    break;
                                case 9: // going one level above
                                    break;
                                default: // data verification
                                    System.out.println("Invalid option, please try again");
                            }
                        } while (search != 9);
                    } else {
                        System.out.println("You need to read the input file first!");
                    }
                    break;
                    
                case 9: // closing the program
                    System.out.println("Closing app, see you later.. alligator!");
                    cont = false;
                    break;
                    
                default: // data verification
                    System.out.println("Invalid option, please input again");
            }
        } while (cont);
    }
}
