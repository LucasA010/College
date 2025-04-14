/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
/**
 *
 * @author lucru
 */
public class UsersManager extends DatabaseManager implements UsersInterface{
    private final InputHandler inpHandler = new InputHandler();
    
    public void deleteUser(String user) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        String query = "DELETE FROM users WHERE Name = ?";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, user);

            int rowsAffected = prepStat.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("User deleted successfully.");
            } else {
                System.out.println("No user found with that name.");
            }
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
        
    }
    
    public void addUser(String name, String role, String email, String password) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        String query = "INSERT INTO users (Name, Role, Email, Password) VALUES (?, ?, ?, ?)";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, name);
            prepStat.setString(2, role);
            prepStat.setString(3, email);
            prepStat.setString(4, password);
            
            int rowsAffected = prepStat.executeUpdate();
            
            if (rowsAffected > 0) {
            System.out.println("User added successfully.");
            } else {
                System.out.println("User was not added.");
            }
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
    }
}
