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
        Menu menu = new Menu();
        
        boolean[] access;        
        String email;
        String password;
        
        
        do {
            System.out.print("Please type your email: ");
            email = sc.nextLine();
            while (!email.matches("^[\\w.-]+@[a-zA-Z]+\\.(com)$")) {
                System.out.println("Invalid email, please try again");
                email = sc.nextLine();
            }
            
            // make checking for correct password 
            System.out.print("Now please type your password: ");
            password = sc.nextLine();

            // returns two booleans, one for login and other for admin access
            access = dbm.logIn(email, password);

            if (!access[0]) {
                System.out.println("Credentials are wrong, please try again");
            } else {
                menu.menu(access[1]); //menuception
            }

            
        } while (!access[0]);
        
       
       
       
       
        
    }
}
