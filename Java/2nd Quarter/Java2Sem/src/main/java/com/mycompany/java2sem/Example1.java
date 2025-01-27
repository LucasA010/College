
package com.mycompany.java2sem;

/**
 *
 * @author lucrujo
 */
public class Example1 {
    
    public static void main(String args[]) {
        int var1;
        int var2;
        
        var1 = 1024;
        System.out.println("Var 1 contains "+var1);
        
        var2 = var1 / 2;
        
        System.out.println("Var 2 is half of var 1: "+var2);
        
        int var3 = var1 * var2;
        
        System.out.println("Var 3 is the multiplication of both variables "+var3);
        
        int var4 = var1 - var2;
        
        System.out.println("Var 4 is the subtractions of frist two variables "+var4);
        
        int var5 = var1 + var2;
        
        System.out.println("Var 5 is the sum of the first two variables "+var5);
        
        if (var1 % 2 == 0) {
            System.out.println(var1+" is even!");
        } else {
            System.out.println(var1+" is odd!");
        }
    }
}
