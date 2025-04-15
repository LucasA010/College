/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
 *
 * @author lucru
 */
public class BookManager extends DatabaseManager implements BookInterface {
    
    public void deleteBook(String name) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        String query = "DELETE FROM books WHERE Title = ?";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, name);

            int rowsAffected = prepStat.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("Book deleted successfully.");
            } else {
                System.out.println("No books found with that name.");
            }
            con.close();
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
    }
    
    public void addBook(String title, String author, String genre) {
        if (!isConnected()){
            System.out.println("something went wrong with the database connection");
        };
        
        String query = "INSERT INTO books (Title, Author, Genre, Availability) VALUES (?, ?, ?, ?)";
        try {
            Connection con = DriverManager.getConnection(url, username, serverPassword);
            PreparedStatement prepStat = con.prepareStatement(query);
            prepStat.setString(1, title);
            prepStat.setString(2, author);
            prepStat.setString(3, genre);
            prepStat.setString(4, "Avaiable");
            
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

    @Override
    public void reserveBook(String bookName) {
        String updateQuery = "UPDATE books SET Availability = ? WHERE Title = ?";
        String statusQuery = "SELECT Availability FROM books WHERE Title = ?";
        
        try (Connection con = DriverManager.getConnection(url, username, serverPassword)) {
            PreparedStatement statusPrepStat = con.prepareStatement(statusQuery);
            statusPrepStat.setString(1, bookName);
            
            ResultSet resSet = statusPrepStat.executeQuery();
            
            if (resSet.next()) {
                String bookStatus = resSet.getString("Availability");
                
                if (bookStatus.equalsIgnoreCase("Avaiable")) {
                    PreparedStatement updatePrepStat = con.prepareStatement(updateQuery);
                    updatePrepStat.setString(1, "Checked Out");
                    updatePrepStat.setString(2, bookName);
                    
                    int rowsAffected = updatePrepStat.executeUpdate();
                    if (rowsAffected > 0) {
                        System.out.println("Book reserved successfully");
                    }
                } else {
                    System.out.println("Book is not avaiable");
                }
            } else {
                System.out.println("Book not found");
            } 
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
        
    }

    @Override
    public void returnBook(String bookName) {
        String updateQuery = "UPDATE books SET Availability = ? WHERE Title = ?";
        String statusQuery = "SELECT Availability FROM books WHERE Title = ?";
        
        try (Connection con = DriverManager.getConnection(url, username, serverPassword)) {
            PreparedStatement statusPrepStat = con.prepareStatement(statusQuery);
            statusPrepStat.setString(1, bookName);
            
            ResultSet resSet = statusPrepStat.executeQuery();
            
            if (resSet.next()) {
                String bookStatus = resSet.getString("Availability");
                
                if (bookStatus.equalsIgnoreCase("Checked Out")) {
                    PreparedStatement updatePrepStat = con.prepareStatement(updateQuery);
                    updatePrepStat.setString(1, "Avaiable");
                    updatePrepStat.setString(2, bookName);
                    
                    int rowsAffected = updatePrepStat.executeUpdate();
                    
                    if (rowsAffected > 0) {
                        System.out.println("Book returned successfully");
                    }
                } else {
                    System.out.println("Book is already returned");
                }
            } else {
                System.out.println("No books with that Title were found");
            }
        } catch (Exception e) {
            System.out.println("Something went wrong");
            e.printStackTrace();
        }
    }

    @Override
    public void dueDates() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
