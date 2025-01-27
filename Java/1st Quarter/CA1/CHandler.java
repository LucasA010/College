package Java.CA1;

import java.time.LocalDate;

public class CHandler {
    // Class variables
    private String clientName;
    private double clientPurchase;
    private int clientClass;
    private int clientLastPurchase;

    //Class constructor
    public CHandler (String clientName, double clientPurchase, int clientClass, int clientLastPurchase) {
        this.clientName = clientName;
        this.clientPurchase = clientPurchase;
        this.clientClass = clientClass;
        this.clientLastPurchase = clientLastPurchase;
    }

    //Getters and setters
    public String getClientName () {
        return clientName;
    }
    public void setClientName (String clientName) {
        this.clientName = clientName;
    }

    public double getclientPurchase () {
        return clientPurchase;
    }
    public void setclientPurchase (double clientPurchase) {
        this.clientPurchase = clientPurchase;
    }

    public int getClientClass () {
        return clientClass;
    }
    public void setClientClass (int clientClass) {
        this.clientClass = clientClass;
    }

    public int getClientLastPurchase () {
        return clientLastPurchase;
    }
    public void setclientLastPurchase (int clientLastPurchase) {
        this.clientLastPurchase = clientLastPurchase;
    }

    //method to calculate discount rate
    public double getDiscount(double clientPurchase, int clientClass, int clientLastPurchase) {
        LocalDate currDate = LocalDate.now();
        int currentYear = currDate.getYear();
        
        //switch statement to get correct discount
        switch (clientClass) {
            
            case 1: 
                if (clientLastPurchase == currentYear) {
                    return clientPurchase * 0.7;
                } else if (clientLastPurchase < currentYear && currentYear-5 <= clientLastPurchase) {
                    return clientPurchase * 0.8;
                } else if (currentYear-5 > clientLastPurchase) {
                    return clientPurchase * 0.9;
                }
                break;

            case 2:
                if (clientLastPurchase == currentYear) {
                    return clientPurchase * 0.85;
                } else if (clientLastPurchase < currentYear && currentYear-5 <= clientLastPurchase) {
                    return clientPurchase * 0.87;
                } else if (currentYear-5 > clientLastPurchase) {
                    return clientPurchase * 0.95;
                }
                break;

            case 3:
                if (clientLastPurchase == currentYear) {
                    return clientPurchase * 0.97;
                } 
        }
        return clientPurchase;

    }

}
