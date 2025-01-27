/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.progclass2;

/**
 *
 * @author lucru
 */
public class Buffs {
    public static void main(String[] args) {
        
        StringBuffer bf1 = new StringBuffer("General");
        StringBuffer bf2 = new StringBuffer("Kenobi");
        
        //Normal strings
        System.out.println(bf1);
        System.out.println(bf2);
        
        //Appended string
        bf1.append(" ").append(bf2);
        System.out.println(bf1);
        
        //Inserted String
        bf1.insert(0, "You, ");
        System.out.println(bf1);
        
        //Reversed String
        System.out.println(bf2.reverse());
        
        //Lengths
        System.out.println(bf1.length());
        System.out.println(bf2.length());
    }
}
