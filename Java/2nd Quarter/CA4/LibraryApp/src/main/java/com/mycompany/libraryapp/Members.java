/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public class Members extends Users {
    private boolean role;
    
    public Members (int ID, String name, boolean role, String email) {
        super(name, email);
        this.role = role;
        this.ID = ID;
    }
    
    @Override
    public boolean getRole() {
        return role;
    }

    public void setRole(boolean role) {
        this.role = role;
    }
}
