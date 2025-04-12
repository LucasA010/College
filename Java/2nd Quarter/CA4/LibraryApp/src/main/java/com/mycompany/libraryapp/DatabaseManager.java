/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.sql.Connection;
import java.sql.DriverManager;
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
    
    public void logIn(String email, String password) {
        isConnected();
    }
}
