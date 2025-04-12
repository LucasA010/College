/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.libraryapp;

/**
 *
 * @author lucru
 */
public interface UsersInterface {
    void deleteUser(Users user);
    void addUser(String name, String role, String email, String password);
}
