/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public interface TransactionInterface {
    void createTransaction(int bookID, int userID, String status);
    void printTransactions(int userID);
    void updateTransaction(int bookID, int userID);
}
