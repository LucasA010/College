/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package com.mycompany.libraryapp;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author lucru
 */
public class UsersManagerTest {
    
 
    /**
     * Test of deleteUser method, of class UsersManager.
     */
    @Test
    public void testDeleteNonExistentUserPrintsMessage() {
        UsersManager manager = new UsersManager();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        System.setOut(new PrintStream(output));

        String nonExistentUsername = "no_such_user";

        manager.deleteUser(nonExistentUsername);

        String consoleOutput = output.toString();
        assertTrue(consoleOutput.contains("No user found with that name."));

        System.setOut(System.out);
    }

    /**
     * Test of addUser method, of class UsersManager.
     */
    @Test
    public void testAddUser() {
        String name = "test_user_add";
        String role = "Member";
        String email = "testuser@example.com";
        String password = "password123";

        UsersManager instance = new UsersManager();

        
        instance.addUser(name, role, email, password);

        boolean userExists = false;

        try {
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/library", "root", "");
            String query = "SELECT * FROM users WHERE Name = ?";
            PreparedStatement prep = con.prepareStatement(query);
            prep.setString(1, name);
            ResultSet rs = prep.executeQuery();

            if (rs.next()) {
                userExists = true;
            }

            rs.close();
            prep.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
            fail("Exception occurred while verifying user in DB.");
        }

    assertTrue("User should be added to the database", userExists);
}
    
}
