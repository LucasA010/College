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
        Scanner sc = new Scanner(System.in);
        System.out.print("Please type your email: ");
        String email;
        String password;
        
        do {
            email = sc.nextLine();
            if (!email.matches("^[\\w.-]+@[a-zA-Z]+\\.(com)$")) {
                System.out.println("Invalid email, please try again");
            }
        } while (!email.matches("^[\\w.-]+@[a-zA-Z]+\\.(com)$"));
        
       // make checking for correct password 
       System.out.print("Now please type your password: ");
       password = sc.nextLine();
       
       
       dbm.logIn(email, password);
       
       Menu menu = new Menu();
        
    }
}
