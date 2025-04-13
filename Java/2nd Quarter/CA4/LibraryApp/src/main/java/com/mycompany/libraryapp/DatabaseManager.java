/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 *
 * @author lucru
 */
public class DatabaseManager {
    protected final String url = "jdbc:mysql://localhost:3306/library";
    protected final String username = "root";
    protected final String serverPassword = "";
    
    public boolean isConnected () { // connection check
        
        try {
            // loading driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            System.out.println("Connection successful\n");
            
            con.close();
            return true;
        } catch (ClassNotFoundException e) {
            System.out.println("Driver not found");
            e.printStackTrace();
            return false;
        } catch (SQLException e) {
            System.out.println("Server not found");
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean[] logIn(String email, String password) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        try {
            String query  = "SELECT * FROM users WHERE Email = ?";
            
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            
            prepStat.setString(1, email);
            
            ResultSet resSet = prepStat.executeQuery();
            
            String passwordCheck = resSet.getString("Password");
            String adminCheck = resSet.getString("Role");
            
            if (password.equals(passwordCheck)) { // first check to credentials
                System.out.println("Login successful!");
            } else {
                System.out.println("Password doesn't match");
                return new boolean[] {false, false};
            }
            
            if (adminCheck.equals("Librarian")) { // second check for admin access
                Users currUser = new Librarian(resSet.getString("Name"), true, resSet.getString("Email"));
                
                return new boolean[] {true, true};
            } else {
                Users currUser = new Members(resSet.getString("Name"), false, resSet.getString("Email"));
                return new boolean[] {true, false};
            }
        } catch (Exception e) {
            System.out.println("Email not found");
            return new boolean[] {false, false};
        }
    }
}
