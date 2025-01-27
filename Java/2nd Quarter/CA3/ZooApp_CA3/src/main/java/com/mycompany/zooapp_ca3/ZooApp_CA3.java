
package com.mycompany.zooapp_ca3;

import java.util.Date;
import java.io.File;
import java.util.HashMap;
import java.util.Scanner;

public class ZooApp_CA3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        File animalsFile = new File("C:\\Users\\lucru\\Documents\\College\\ZooApp_CA3\\src\\main\\java\\com\\mycompany\\zooapp_ca3\\animals.txt");
        // functional variables
        int option;
        boolean cont = true;
        boolean isRead = false;
        int lineCounter = 1;
        int linesPerAnimal = 4;
        // Animal variables
        String type;
        String species;
        String name;
        String habitat;
        Date dateOfBirth = null;
        double weight;
        HashMap<String, String> comments = new HashMap<String, String>();
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
                            Scanner fr = new Scanner(animalsFile);
                            while(fr.hasNextLine()) {
                                for (int i=1; i<=linesPerAnimal; i++) {
                                    switch (i) {
                                        // validation for line 1
                                        case 1:
                                            String line1 = fr.nextLine();
                                            System.out.println(line1+" this is the line 1");
                                            String[] line1Splitted = line1.split(",");
                                            // Check if all data is there
                                            if (line1Splitted.length < 3) {
                                                System.out.println("There are elements missing on line x."); 
                                                System.out.println("Please ensure that specifies type, species and name consecutively separeted by a comma");
                                            } else {
                                                for (int j=0; j<line1Splitted.length; j++) {
                                                    // Switch statement to validate each data separetely
                                                    switch(j) {
                                                        // Type validation
                                                        case 0:
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z]+")) {
                                                                System.out.println("Type on line x is wrong");
                                                            }
                                                            break;
                                                        // Species validation
                                                        case 1:
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z]+")) {
                                                                System.out.println("Species on line x is wrong");
                                                            }
                                                            break;
                                                        // Name validation
                                                        case 2:
                                                            if (!line1Splitted[j].toLowerCase().strip().matches("[a-z0-9]+")) {
                                                                System.out.println("Name on line x is wrong");
                                                            }
                                                            break;
                                                    }
                                                }
                                            }
                                            break;
                                        // validation for line 2
                                        case 2:
                                            System.out.println("now looking line 2");
                                            break;
                                        // validation for line 3
                                        case 3:
                                            System.out.println("now looking line 3");
                                            break;
                                        // validation for line 4
                                        case 4:
                                            System.out.println("Now looking line 4");
                                            break;
                                        default:
                                            System.out.println("idk why i am here now");
                                            break;
                                    }
                                }
                            }
                        } catch (Exception e) {
                            System.out.println("deu ruim");
                        }
                        // signal that the file has been read and approved
                        isRead = true;
                    }
                    
                    
                    // assign variables and create proper objects
                    
                    
                    break;
                case 2: // display all animals
                    // only avaible if file is read - IMPORTANT
                    // loop through animals list to display all animals
                    // something like My name is bob, im a tortoise and I live in the swamp
                    break;
                case 3: // search surface level
                    // only avaible if file is read - IMPORTANT
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
                            case 1: // type
                                // only option with more options
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
                    System.out.println("Case 3");
                    break;
                case 9: // closing the program
                    System.out.println("Closing app, see you later.. aligator!");
                    cont = false;
                    break;
                default: // data verification
                    System.out.println("Invalid option, please input again");
            }
        } while (cont);
        
        // System.out.println(option);
    }
}
