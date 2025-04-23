/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package com.mycompany.libraryapp;


import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import static org.junit.Assert.*;

/**
 *
 * @author lucru
 */
public class BookManagerTest {
    
    /**
     * Test of deleteBook method, of class BookManager.
     */
    @org.junit.Test
    public void testDeleteBookPrintsSuccessMessage() {
        BookManager manager = new BookManager();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        System.setOut(new PrintStream(output));

        String title = "Book To Delete";
        String author = "Author";
        String genre = "Genre";

        manager.addBook(title, author, genre);
        manager.deleteBook(title);

        String consoleOutput = output.toString();
        assertTrue(consoleOutput.contains("Book deleted successfully"));

        System.setOut(System.out);
    }

    /**
     * Test of addBook method, of class BookManager.
     */
    @org.junit.Test
    public void testAddBookPrintsSuccessMessage() {
        BookManager manager = new BookManager();

        
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        System.setOut(new PrintStream(output));

        String title = "JUnit Test Book";
        String author = "Test Author";
        String genre = "Testing";

        manager.addBook(title, author, genre);

        String consoleOutput = output.toString();
        assertTrue(consoleOutput.contains("Book added successfully"));

        System.setOut(System.out);
    }

    /**
     * Test of reserveBook method, of class BookManager.
     */
    @org.junit.Test
    public void testReserveBookPrintsSuccessMessage() {
        BookManager manager = new BookManager();

       
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        System.setOut(new PrintStream(output));

       
        String title = "Test Book";
        String author = "Test Author";
        String genre = "Test Genre";
        Users user = new Members(1, "testuser", false, "testuser@test.com"); 

        manager.addBook(title, author, genre);
        manager.reserveBook(title, user);


        String consoleOutput = output.toString();
        assertTrue(consoleOutput.contains("Book reserved successfully"));


        System.setOut(System.out);
    }

    /**
     * Test of returnBook method, of class BookManager.
     */
    @org.junit.Test
    public void testReturnBookPrintsSuccessMessage() {
    BookManager manager = new BookManager();

    ByteArrayOutputStream output = new ByteArrayOutputStream();
    System.setOut(new PrintStream(output));

    String title = "Return Test Book";
    String author = "Return Author";
    String genre = "Return Genre";

    Users user = new Members(1, "testuser", false, "testuser@test.com"); 

 
    manager.addBook(title, author, genre);
    manager.reserveBook(title, user);

    manager.returnBook(title, user);

    String consoleOutput = output.toString();
    assertTrue(consoleOutput.contains("Book returned successfully"));

    System.setOut(System.out);
}
    
}
