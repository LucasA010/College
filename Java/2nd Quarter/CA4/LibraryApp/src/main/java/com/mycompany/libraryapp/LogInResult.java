/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public class LogInResult {
    private boolean success;
    private Users user;
    
    public LogInResult (boolean success, Users user) {
        this.success = success;
        this.user = user;
    }
    
    public boolean isSuccess() {
        return success;
    }

    public Users getUser() {
        return user;
    }
}
