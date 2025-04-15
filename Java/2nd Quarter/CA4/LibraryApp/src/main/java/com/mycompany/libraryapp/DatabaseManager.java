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
    
    public LogInResult logIn(String email, String password) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        LogInResult currUser = null;
        String passwordCheck = "";
        String adminCheck = "";
        int userID = 0;
        
        try {
            String query  = "SELECT * FROM users WHERE Email = ?";
            
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, email);
            
            ResultSet resSet = prepStat.executeQuery();
            
            if (resSet.next()) {
                passwordCheck = resSet.getString("Password");
                adminCheck = resSet.getString("Role");
                userID = resSet.getInt("ID");
            }
            
            
            if (password.equals(passwordCheck)) { // first check to credentials
                System.out.println("Login successful!");
                if (adminCheck.equals("Librarian")) { // second check for admin access
                    currUser = new LogInResult(true, new Librarian(userID, resSet.getString("Name"), true, resSet.getString("Email")));
                
                } else {
                    currUser = new LogInResult(true, new Members(userID, resSet.getString("Name"), false, resSet.getString("Email")));
                }
            } else {
                System.out.println("Password doesn't match");
                return currUser;
            }
            
            
            return currUser;
        } catch (Exception e) {
            System.out.println("Email not found");
            System.out.println("This is the error");
            e.printStackTrace();
            return currUser;
        }
    }
}
