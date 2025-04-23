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
public class InputHandler {
    private static final Scanner sc = new Scanner(System.in);
    
    public int getInt(String prompt) {
        int value;
        
        while (true) {
            try {
                System.out.println(prompt);
                value = Integer.parseInt(sc.nextLine());
                break;
            } catch (NumberFormatException e) {
                System.out.println("Input invalid, please try again");
            }
        }
        return value;
    }
    
    public boolean getBoolean(String prompt) {
        while (true) {
            System.out.println("Please enter true or false: ");
            System.out.println(prompt);
            String input = sc.nextLine().toLowerCase();
            if (input.equals("true") || input.equals("yes")) return true;
            if (input.equals("false") || input.equals("no")) return false;
        }
    }
    
    public String getString (String prompt) {
        System.out.println(prompt);
        return sc.nextLine().trim();
    }
    
    public String getEmail (String prompt) {
        System.out.println(prompt);
        String email = sc.nextLine();
        
        while (!email.matches("^[\\w.-]+@[a-zA-Z]+\\.(com)$")) {
                System.out.println("Invalid email, please try again");
                email = sc.nextLine();
        }
        return email;
    }
    
    public String getRole(String prompt) {
        System.out.println(prompt);
        String role = sc.nextLine();
        
        while (!role.equals("Librarian") && !role.equals("Member")) {
            System.out.println("Invalid option, please type either 'Librarian' or 'Member'");
            role = sc.nextLine();
        }
        return role;
    }
}
