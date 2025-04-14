/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.libraryapp;

import java.util.Scanner;
/**
 *
 * @author lucru
 */
public class LibraryApp {

    public static void main(String[] args) {
        DatabaseManager dbm = new DatabaseManager();
        InputHandler inpHandler = new InputHandler();
        Scanner sc = new Scanner(System.in);
        Menu menu = new Menu();
        
        
        LogInResult access;        
        String email;
        String password;
        Users currUser;
        
        
        do {
            email = inpHandler.getEmail("Please type your email");
            
            // make checking for correct password 
            System.out.print("Now please type your password: ");
            password = sc.nextLine();

            // returns two booleans, one for login and other for admin access
            access = dbm.logIn(email, password);
            if (access.getUser() == null) {
                System.out.println("User is undefined");
                break;
            } else {
                currUser = access.getUser();
            }
            
            
            if (!access.isSuccess()) {
                System.out.println("Credentials are wrong, please try again");
            } else {
                menu.menu(currUser); //menuception
            }

            
        } while (!access.isSuccess());
        
       
       
       
       
        
    }
}
