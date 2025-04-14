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
    private final Scanner sc = new Scanner(System.in);
    private final InputHandler inpHandler = new InputHandler();
    
    public void menu(Users user) {
          // menu
        var bookManager = new BookManager();
        var userManager = new UsersManager();
        Boolean cont = true;
        int option;
        int subOption;
        boolean isAdmin = user.getRole();
        boolean confirm;
        boolean finished;
        
        do {
            // menu for members
            // condition to only trigger this menu in case user is a member
            System.out.println("Please select an option: ");
            System.out.println("1 - Reserve a book");
            System.out.println("2 - Return a book");
            System.out.println("3 - Books due dates");
            if (isAdmin){ // condition for admin options
                System.out.println("4 - Users menu");
                System.out.println("5 - Books menu");
            }
            System.out.println( "-1 - Exit Program");
            
            option = inpHandler.getInt("Type your option -> ");
            
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
                    
                    do {
                        System.out.println( "Please select an option:");
                        System.out.println("1 - Add an User");
                        System.out.println("2 - Delete an User");
                        System.out.println("-1 - Return");
                        subOption =  inpHandler.getInt("Type your option -> ");
                        
                        switch (subOption) {
                            case 1: // add an user
                                String name, role, email, password;
                                
                                name = inpHandler.getString("Please type the name: ");
                                role = inpHandler.getRole("Please type the role: ");
                                email = inpHandler.getEmail("Please type the email: ");
                                password = inpHandler.getString("Please type the password: ");
                                
                                userManager.addUser(name, role, email, password);
                                break;

                            case 2: // delete an user
                                finished = false;
                                do {
                                    String nameDeletion = inpHandler.getString("Please type the name of the user you wish to delete");
                                    
                                    try {
                                        confirm = inpHandler.getBoolean("Are you sure you want to proceed? ");

                                        if (confirm) {
                                            userManager.deleteUser(nameDeletion);
                                            finished = true;
                                            
                                        }
                                    } catch (Exception e){
                                        System.out.println("Input is wrong");

                                    };
                                } while (!finished);
                                
                                break;

                            case -1: // return
                                System.out.println("Returning to main menu");
                                break;

                            default:
                                System.out.println("Please input a valid option\n");
                                break;
                        }
                    } while (subOption != -1);
                    break;
                
                case 5: // admin - manage books
                    if (!isAdmin) {
                        System.out.println("Please input a valid option\n");
                        break;
                    }
                    
                    
                    
                     do {
                        System.out.println( "Please select an option:");
                        System.out.println("1 - Add a Book");
                        System.out.println("2 - Delete a Book");
                        System.out.println("-1 - Return");
                         
                        subOption = inpHandler.getInt("Type your option -> ");
                         
                        switch (subOption) {
                            
                            case 1: // add a book
                                finished = false;
                                String title, author, genre;
                                do {
                                    title = inpHandler.getString("Please type the book Title:");
                                    author = inpHandler.getString("Please type the book Author: ");
                                    genre = inpHandler.getString("lease type the book Genre: ");
                                    
                                    System.out.println("Are the details correct?");
                                    System.out.println("Title: " + title);
                                    System.out.println("Author: " + author);
                                    System.out.println("Genre: " + genre);
                                    
                                    try {
                                        confirm = inpHandler.getBoolean("Are the details correct? ");

                                        if (confirm) {
                                            bookManager.addBook(title, author, genre);
                                            finished = true;
                                            
                                        }
                                    } catch (Exception e){
                                        System.out.println("Input is wrong");

                                    };
                                } while (!finished);
                                break;

                            case 2: // delete a book
                                finished = false;
                                
                                do {
                                    try {
                                        String bookDeletion = inpHandler.getString("Please type the book Title: ");
                                        confirm = inpHandler.getBoolean("Is the title of the book correct? "+bookDeletion);

                                        if (confirm) {
                                            bookManager.deleteBook(bookDeletion);
                                            finished = true;
                                            break;
                                        }
                                    } catch (Exception e){
                                        System.out.println("Input is wrong");
                                    };
                                } while (!finished);
                                break;

                            case -1:
                                System.out.println("Returning to main menu");
                                break;

                            default:
                                System.out.println("Please input a valid option");
                                break;
                        }
                    } while (subOption != -1);
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
