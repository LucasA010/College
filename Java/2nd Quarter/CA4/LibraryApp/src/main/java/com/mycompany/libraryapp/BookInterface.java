/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public interface BookInterface {
    void deleteBook(String name);
    void addBook(String title, String author, String genre, String avaiability);
    void reserveBooks();
    void returnBook();
    
}
