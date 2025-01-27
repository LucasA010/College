/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.progclass2;

/**
 *
 * @author lucru
 */
public class ProgClass2 {

    public static void main(String[] args) {
        
        
        String name = "Lucas";
        
        for(int i=0; i<5; i++) {
            System.out.println(name);
        }
        
        String[] names = {"Cristina", "Gavan", "Colm", "Paolo", "Lucas"};
        
        for(int i=0; i<names.length; i++) {
            System.out.println(names[i]);
        }
        
        //Revision on while and do while

        //Enhanced for loop
        int[] nums = {10, 20, 30, 40, 50};
        for(int x:nums) {
            System.out.println(x);
        }
        }
}
