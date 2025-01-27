
import java.util.Scanner;


public class Main
{    
    // https://github.com/LucasA010/College/tree/main/Java/CA2
    public static void main(String[] args) {
        
        // Creating a matrix class with use inputs
        Matrix a = createMatrix();
        
        // Diagonal sum
        System.out.println("The diagonals sums of the Matrix are as follows:");
        a.diagSum();
        a.printMatrix();

        // Spiral os matrix
        System.out.println("The spiral of the matrix is: ");
        a.arraySpiral();

        // Multiplication table
        System.out.println("Now for the Multiplication table!");
        multTable();

        // Array search
        System.out.println("Array search next!");
        arraySearch();

        // Bubble sort
        System.out.println("Lastly the bubble sort algo");
        bubbleSort();

       
    }

    public static Matrix createMatrix() {
        // Function to create matrix
        Scanner sc = new Scanner(System.in);

        System.out.print("What letter will the matrix have as name? ");
        String matrixName = sc.nextLine();
        
        System.out.print("How many rows will the matrix have? ");
        int rowSize = sc.nextInt();

        System.out.print("How many columns will the matrix have? ");
        int colSize = sc.nextInt();

        Matrix a = new Matrix(matrixName, rowSize, colSize);
        return a;
    }

    public static void multTable() {
        Scanner sc = new Scanner(System.in);
        // User input for size of matrix
        System.out.println("What number would you like to input for the table? ");
        int number = sc.nextInt();

        // Loop to calculate and print the result in a table format
        int arr[][]  = new int[number][number];
        for (int row=0; row<arr.length;row++) {
            for (int col=0; col<arr[row].length;col++) {
                arr[row][col] = (row+1)*(col+1);
                System.out.printf("%2d ", arr[row][col]);
            }
            System.out.println("");
        }
    }

    public static int[] createArray() {
        // Function to create array based on user input
        Scanner sc = new Scanner(System.in);
        System.out.print("What size will be the array? ");
        int arrSize = sc.nextInt();
        
        int[] arr = new int[arrSize];

        for (int i = 0; i<arr.length; i++) {
            System.out.print("Please type the "+i+" number: ");
            int arrElement = sc.nextInt();
            arr[i] = arrElement;
        }
        return arr;
    }

    public static void arraySearch() {
        int[] arr = createArray();
        // Double loop to check repeated elements in an array
        for (int i=0; i<arr.length; i++) {
            for (int r = 0; r<i; r++) {
                if (arr[r] == arr[i]) {
                    System.out.println("The number "+arr[i]+" is repeated on index "+i);
                    return;
                }
            }
        
        }
        System.out.println("There aren't repeated elements");
    }

    public static void bubbleSort() {
        int arr[] = createArray();

        // Double loop for bubble sorting
        // The second loop checks wheter the next value is smaller, if it is they swap
        // Very similar to the array check
        for (int i=0; i<arr.length-1; i++) {
            for (int j=0; j<arr.length-1-i; j++) {
                if (arr[j] > arr[j +1]) {
                    int temp = arr[j];

                    arr[j] = arr[j +1];
                    arr[j +1] = temp;
                }
            }
        }
        for (int num : arr) {
            System.out.print(num + " ");
        };
    }

    
}
