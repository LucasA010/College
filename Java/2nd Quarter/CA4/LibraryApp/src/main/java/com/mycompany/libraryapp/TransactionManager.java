/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.libraryapp;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;

/**
 *
 * @author lucru
 */
public class TransactionManager extends DatabaseManager implements TransactionInterface {

    @Override
    public void createTransaction(int bookID, int userID, String status) {
        String insertQuery = "INSERT INTO transactions (BookID, UserID, IssueDate, ReturnDate, Status) VALUES (?, ?, ?, ?, ?)";
        try (Connection con = DriverManager.getConnection(url, username, serverPassword)) {
            PreparedStatement prepStat = con.prepareStatement(insertQuery);
            
            LocalDate issueDate = LocalDate.now();
            LocalDate returnDate = issueDate.plusWeeks(2);
            
            prepStat.setInt(1, bookID);
            prepStat.setInt(2, userID);
            prepStat.setDate(3, Date.valueOf(issueDate));
            prepStat.setDate(4, Date.valueOf(returnDate));
            prepStat.setString(5, status);
            
            prepStat.executeUpdate();
            System.out.println("Transaction created");
        } catch (Exception e) {
            System.out.println("Insertion failed");
            e.printStackTrace();
        }
        
        
    }

    @Override
    public void printTransactions(int userID) {
       String query = "SELECT * FROM transactions WHERE UserID = ?";

        try (Connection con = DriverManager.getConnection(url, username, serverPassword);
        PreparedStatement prepStat = con.prepareStatement(query)) {

        prepStat.setInt(1, userID);
        ResultSet resSet = prepStat.executeQuery();

        while (resSet.next()) {
            int transactionId = resSet.getInt("TransactionID");
            int bookID = resSet.getInt("BookID");
            Date issueDate = resSet.getDate("issueDate");
            Date returnDate = resSet.getDate("returnDate");
            String status = resSet.getString("Status");

            System.out.println("TransactionID: " + transactionId);
            System.out.println("BookID: " + bookID);
            System.out.println("Issue Date: " + issueDate);
            System.out.println("Return Date: " + returnDate);
            System.out.println("status: " + status);
        }

    } catch (Exception e) {
        System.out.println("Error fetching user transactions");
        e.printStackTrace();
    }     
    }

    @Override
    public void updateTransaction(int bookID, int userID) {
        String updateQuery = "UPDATE transactions SET Status = 'Returned' WHERE BookID = ? AND UserID = ? AND Status = 'Checked Out'";
        try (Connection con = DriverManager.getConnection(url, username, serverPassword)) {
            PreparedStatement prepStat = con.prepareStatement(updateQuery);
            
            prepStat.setInt(1, bookID);
            prepStat.setInt(2, userID);
            
            prepStat.executeUpdate();
            System.out.println("Transaction registered");
            
            
        } catch (Exception e) {
            System.out.println("Update failed");
            e.printStackTrace();
        }
        
        
    }
    
}
