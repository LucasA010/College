package Java.CA1;

import java.io.File;
import java.io.FileWriter;
import java.time.LocalDate;
import java.util.Scanner;

public class CAssignment1 {
    
    //https://github.com/LucasA010/College/tree/main/Java
    public static void main(String a[]) {
        
        //try catch to handle customers file
        try {
            //input file path
            File f1 = new File("customers.txt");
            if (!f1.isFile()) {
                throw new Exception("Couldn't find the path to your customers input file"+
                "\nPlease make sure the file is properly named");
            }
            
            //scanner to read input file
            Scanner sc = new Scanner(f1);
            
            //output file creation and check if it exists
            File f2 = new File("customerdiscount.txt");
            if (!f2.isFile()) {
                f2.createNewFile();
                System.err.println("File customerdiscount didn't exist, I went ahead and created for you");
            }

            //file writer obj creation targeting output file
            FileWriter fw = new FileWriter("customerdiscount.txt");

            //variable to print validity msg just once
            boolean validityMsg = true;

            //variable to count client lines
            int lineNum = 1;

            //loop to iterate file data
            while (sc.hasNextLine()) {
                //variables for each client
                String clientName = sc.nextLine();
                String clientPurchase = sc.nextLine();
                String clientClass = sc.nextLine();
                String clientLastPurchase = sc.nextLine();

                if (clientCheck(clientName, clientPurchase, clientClass, clientLastPurchase)) {
                    //Second year check to see if is valid
                    LocalDate currDate = LocalDate.now();
                    int currentYear = currDate.getYear();

                    int checkYear = Integer.parseInt(clientLastPurchase);
                    if ((currentYear-10) > checkYear || checkYear > currentYear) {
                        throw new Exception("Client "+clientName+" on line "+lineNum+" has a invalid year!");
                    }

                    //if everything is valid the following message will print and the output file will be written
                    if (validityMsg && !sc.hasNextLine()) {
                        System.err.println("All data was valid, printing into output file now!\n");
                        validityMsg = false;
                    }
                    
                    
                } else {
                    //Message in case any data is invalid
                    throw new Exception("Client "+clientName+" on line "+lineNum+" has incorrect data!\n");
                }
                lineNum += 4;


                
                //creating client obj
                CHandler ch = new CHandler(
                            clientName, 
                            Double.parseDouble(clientPurchase), 
                            Integer.parseInt(clientClass), 
                            Integer.parseInt(clientLastPurchase));

                double finalValue = ch.getDiscount(ch.getclientPurchase(), ch.getClientClass(), ch.getClientLastPurchase());
                double discount = 100 * finalValue / ch.getclientPurchase(); 
                
                //printing into output file
                fw.write(clientName); // printing client name
                fw.write("\n"); //new line method
                fw.write("€"); //euro symbol for better reading
                fw.write(String.valueOf(String.format("%.02f", finalValue))); // Discounted price formated to 2 decimals after dot
                fw.write("\t discount of "+String.valueOf(String.format("%.2f", Math.abs(discount-100)))+"%"); //% discounted of the price with formatting of 2 decimals after dot
                fw.write("\n");
                fw.write("\n");
            }

            //objects closure
            fw.close();
            sc.close();
        } catch (Exception e) {
            //instructions on how to properly type the data in the input file
            System.err.println( e +
                                "\nPlease make sure that is in the following format:\n"+
                                "\n -> John Doe (numbers can be used only on the surname. With one space between first name and surname)"+
                                "\n -> 100.00 (value must have a decimal dot and only numbers)"+
                                "\n -> 1 (class must be between 1 and 3)"+
                                "\n -> 2024 (last purchase must be a valid year after 2014)");
        }
    }

    //method using regex while variables are still Strings to verify if is in the correct format
    static boolean clientCheck (String clientName, String clientPurchase, String clientClass, String clientLastPurchase) {
        if (clientName.toLowerCase().matches("[a-z]+ {1}[a-z0-9]+")
            && clientPurchase.matches("\\d+.{1}\\d+")
            && clientClass.matches("[1-3]")
            && clientLastPurchase.matches("\\d{4}")) {
            return true;
        }  else {
            return false;
        }
    
}
}


