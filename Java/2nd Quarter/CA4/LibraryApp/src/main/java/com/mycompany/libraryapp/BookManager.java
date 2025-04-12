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
public class BookManager extends DatabaseManager implements BookInterface {
    
    public void deleteBook(String name) {
        isConnected(); 
        
        String query = "DELETE FROM books WHERE Name = ?";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, name);

            int rowsAffected = prepStat.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("User deleted successfully.");
            } else {
                System.out.println("No user found with that name.");
            }
            con.close();
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
    }
    
    public void addBook(String title, String author, String genre, String avaiability) {
        isConnected();
        
        String query = "INSERT INTO books (Title, Author, Genre, Availability) VALUES (?, ?, ?, ?)";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, title);
            prepStat.setString(2, author);
            prepStat.setString(3, genre);
            prepStat.setString(4, avaiability);
            
            int rowsAffected = prepStat.executeUpdate();
            
            if (rowsAffected > 0) {
            System.out.println("Book added successfully.");
            } else {
                System.out.println("Book was not added.");
            }
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
    }
}
