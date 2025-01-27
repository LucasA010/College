
package com.mycompany.java2sem;

/**
 *
 * @author lucru
 */

import javax.swing.*;

public class SwingInput {
    
    public static void main(String[] args) {
        
        String temp;
        
        temp = JOptionPane.showInputDialog(null, "First Number");
        int a = Integer.parseInt(temp);
        
        temp = JOptionPane.showInputDialog(null, "Second Number");
        int b = Integer.parseInt(temp);
        
        temp = JOptionPane.showInputDialog(null, "Third Number");
        int c = Integer.parseInt(temp);
        
        double avg = (a + b + c) / 3;
        
        JOptionPane.showMessageDialog(null, "Average is "+avg);
    }
}
