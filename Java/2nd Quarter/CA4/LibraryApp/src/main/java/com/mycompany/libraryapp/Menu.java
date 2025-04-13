/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.util.Scanner;
/**
 *
 * @author lucru
 */
public class Menu {
    
    public void menu(Boolean isAdmin) {
          // menu
//        Boolean isAdmin = true; // variable to check user privileges
        Scanner sc = new Scanner(System.in);
        Boolean cont = true;
        int option;
        
        do {
            // menu for members
            // condition to only trigger this menu in case user is a member
            System.out.println( "Please select an option:\n"+
                                "1 - Reserve a book\n"+
                                "2 - Return a book\n"+
                                "3 - Books due dates");
            if (isAdmin){ // condition for admin options
                System.out.println( "4 - Manage Books\n"+
                                    "5 - Manage Users");
            }
            System.out.println( "-1 - Exit Program");
            
            option = sc.nextInt();
            
            switch (option) {
                case 1: // reserve a book
                    // function in different class to reserve book
                    break;
                
                case 2: // return a book
                    // function in different class to return book
                    break;
                
                case 3: // due dates
                    // function in different class to show due dates
                    break;
                
                case 4: // admin - manage users
                    if (!isAdmin) {
                        System.out.println("Please input a valid option\n");
                        break;
                    }
                    System.out.println( "Please select an option:\n" +
                                        "1 - Add an User\n"+
                                        "2 - Delete an User\n"+
                                        "-1 - Return");
                    option = sc.nextInt();
                    
                    do {
                        switch (option) {
                            case 1: // add an user
                                // function to add users
                                break;

                            case 2: // delete an user
                                // function to delete users
                                break;

                            case -1: // return
                                // returning to main menu
                                break;

                            default:
                                System.out.println("Please input a valid option\n");
                                break;
                        }
                    } while (option > 0);
                
                case 5: // admin - manage books
                    if (!isAdmin) {
                        System.out.println("Please input a valid option\n");
                        break;
                    }
                    System.out.println( "Please select an option:\n" +
                                        "1 - Add a Book\n"+
                                        "2 - Delete a Book\n"+
                                        "-1 - Return");
                    option = sc.nextInt();
                    
                     do {
                        switch (option) {
                            case 1: // add a book
                                // function to add books
                                break;

                            case 2: // delete a book
                                // function to delete books
                                break;

                            case -1:
                                // returning to main menu
                                break;

                            default:
                                System.out.println("Please input a valid option\n");
                                break;
                        }
                    } while (option > 0);
                    break;
                
                case -1:
                    cont = false;
                    //exit program
                    break;
                    
                default:
                    System.out.println("Please input a valid option");
                    break;
                
            
            }
        } while (cont);
    }
}
