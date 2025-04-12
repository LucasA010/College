/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public class Librarian extends Users{
    private String role;
    
    public Librarian (String name, String role, String email, String password) {
        super(name, email, password);
        this.role = "Librarian";
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
