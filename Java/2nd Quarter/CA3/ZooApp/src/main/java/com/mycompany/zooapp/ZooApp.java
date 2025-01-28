
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
        File animalsFile = new File("C:\\Users\\lucru\\Documents\\College\\Java\\2nd Quarter\\CA3\\ZooApp\\src\\main\\java\\com\\mycompany\\zooapp\\animals.txt");
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
//        DateFormat dateCheck = new SimpleDateFormat("yyyy/MM/dd"); // Valid date format
//        dateCheck.setLenient(false); // Allows only exact match
        
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
                            Scanner fr = new Scanner(animalsFile); // Creating file reader object
                            
                            while (fr.hasNextLine()){totalLines++;}; // Getting total of lines
                            
                            while(fr.hasNextLine()) { // Loops until there aren't more lines in the file
                                boolean animalValid = true; // In case any data on animal is wrong the object will not be created
                                
                                for (int i=1; i<=linesPerAnimal; i++) {
                                    switch (i) {
                                        // validation for line 1
                                        case 1:
                                            String line1 = fr.nextLine(); // Getting data on line 1
                                            String[] line1Splitted = line1.split(","); // Splittign the data at the comme
                                            lineCounter ++; // Incrementing line counter
                                            
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
                                            // List of acceptable habitats
                                            String[] line2Check = {"jungle", "mountain", "desert", "ocean", "grass", "swamp", "snow", "tundra"};
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
                                                for (int l=0; l<line4Splitted.length; l+=2) {
                                                    comments.put(line4Splitted[l], line4Splitted[l+1]);
                                                }
                                            }
                                            
                                            // MOVE TO PROPER PLACE
                                            // MOVE TO PROPER PLACE
                                            // enhanced loop to print hash map
                                            for (String l:comments.keySet()) {
                                                System.out.println("The animal('s) "+l+"('s) "+comments.get(l));
                                            }
                                            // MOVE TO PROPER PLACE
                                            // MOVE TO PROPER PLACE
                                            break;
                                    }
                                }
                                // assign variables and create proper objects in case all data is correct
                                if (animalValid) {
                                    Animal[] animals = new Animal[totalLines/4];
                                    switch (type.toLowerCase()){
                                        case "fish":
                                            animals[lineCounter/4] = new Fish(name, species, habitat, dateOfBirth, weight, comments);
                                            System.out.println("Fish created");
                                            break;
                                            
                                        case "mammal":
                                            animals[lineCounter/4] = new Mammal(name, species, habitat, dateOfBirth, weight, comments);
                                            System.out.println("Mammal created");
                                            break;
                                            
                                        case "reptile":
                                            animals[lineCounter/4] = new Reptile(name, species, habitat, dateOfBirth, weight, comments);
                                            System.out.println("Reptile created");
                                            break;
                                            
                                        case "bird":
                                            animals[lineCounter/4] = new Bird(name, species, habitat, dateOfBirth, weight, comments);
                                            System.out.println("Bird created");
                                            break;
                                        default:
                                            System.out.println("Noone created");
                                            break;
                                    }
                                } 
                    
                    
                                // assign variables and create proper objects
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
                    if (isRead) {
                        
                    } else {
                        System.out.println("You need to read the input file first!");
                    }
                    // loop through animals list to display all animals
                    // something like My name is bob, im a tortoise and I live in the swamp
                    break;
                    
                case 3: // search surface level
                    // only avaible if file is read - IMPORTANT
                    if (isRead) {
                            // only option with differente possibilities
                        int search;
                        // second loop for more precise search
                        do {
                            System.out.print("\t1 - Types..\n"+
                                             "\t2 - Habitat\n"+
                                             "\t3 - Name\n"+
                                             "\t4 - Species\n"+
                                             "\t9 - Previous menu");
                            // user input for search
                            search = sc.nextInt();

                            switch(search) {
                                case 1: // type; only option with more options
                                    int typeSearch;
                                    
                                    // third loop 
                                    do {
                                        System.out.print("\t1 - Mammal\n"+
                                                        "\t2 - Bird\n"+
                                                        "\t3 - Reptile\n"+
                                                        "\t4 - Fish\n"+
                                                        "\t9 - Previous menu");
                                        // user input for types
                                        typeSearch = sc.nextInt();
                                        // third switch statement for type search
                                        switch(typeSearch) {
                                            case 1: // mammal search
                                                System.out.println("searchin by mammal");
                                                break;
                                            case 2: // bird search
                                                System.out.println("searchin by bird");
                                                break;
                                            case 3: // reptile search
                                                System.out.println("searchin by reptile");
                                                break;
                                            case 4: // fish search
                                                System.out.println("searchin by fish");
                                                break;
                                            case 9: // going one level above
                                                break;
                                            default: // data verification
                                            System.out.println("Please input correct option");
                                            break;
                                        }

                                    } while (typeSearch != 9);
                                    System.out.println("search by types..");
                                    break;
                                case 2: // habitat search
                                    System.out.println("search by habitat");
                                    break;
                                case 3: // name search
                                    System.out.println("search by name");
                                    break;
                                case 4: // species search
                                    System.out.println("search by species");
                                    break;
                                case 9: // going one level above
                                    System.out.println("going back if it works out");
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
