import java.util.Scanner;
import java.util.ArrayList;


public class Matrix {
    // Variables
    private String name;
    private int row;
    private int column;
    private int arr[][];
    private boolean square;
    
    // Constructor
    public Matrix (String name, int row, int column) {
        // Assigning variables
        this.name = name;
        this.row = row;
        this.column = column;
        
        // Building matrix and checking properties
        matrixBuilder(row, column);
        matrixCheck();
    }
    
    // Getters and setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getRow() {
        return row;
    }
    
    public int getColumn() {
        return column;
    }
    
    public boolean isSquare() {
        return square;
    }
    
    private void matrixCheck() {
        this.square = (row == column) ? true : false;
    }
    
    // Method to build matrix
    private void matrixBuilder (int row, int column) {
        this.arr = new int[row][column];
        Scanner sc = new Scanner(System.in);
        
        // Row loop
        for (int i=0; i<row; i++) {
            // Column loop
            for (int j=0; j<column; j++){
                System.out.print("Digite o valor do elemento da linha "+i+" na coluna "+j+": ");
                arr[i][j] = sc.nextInt();
            }
        }
    }

    // Method to print matrix
    public void printMatrix() {
        for (int[] r : arr) {
            for (int i : r) {
                System.out.print("| ");
                System.out.print(i+" | ");
            }
            System.out.println("");
        }
    }

    // Method to sum diagonals of matrix
    public void diagSum() {

        // Check to see if matrix is square
        if (!isSquare()) {
            System.out.println("Cant sum the diagonal of this matrix as it no a square matrix");
            return;
        }

        int secondaryDiagonal = 0;
        int mainDiagonal = 0;
         // Simple loop for diagonals sum
        for (int i=0; i<arr.length; i++) {
            
            // Sum of diagonal matrix since the index of row and column are equal
            mainDiagonal += arr[i][i];
            
            // The indexes of the secondary diagonal are consistent, hence the formula
            // arr[row][matrixSize - (index +1)] can be applied
            secondaryDiagonal += arr[i][row - (i + 1)];
        }
        System.out.println("The sum of the main diagonal is: "+mainDiagonal);
        System.out.println("The sum of the secondary diagonal is: "+secondaryDiagonal);
    }

    public void arraySpiral() {
        int rowSize = arr.length;
        int colSize = arr[0].length;

        // List to store the spiral order elements
        ArrayList<Integer> answer = new ArrayList<>();
        boolean[][] check = new boolean[rowSize][colSize];
        // 2D array to keep track of visited cells
       

        // Change in row index for each direction
        int[] directionRow = { 0, 1, 0, -1 };
        // Change in column index for each direction
        int[] directionCol = { 1, 0, -1, 0 };
        

        // Initial position in the matrix
        int currRow = 0;
        int currCol = 0;

        // Initial direction 
        int direction = 0;

        // Iterate through all elements in the matrix
        for (int i = 0; i < rowSize * colSize; ++i) {

            // Add current element to result list
            answer.add(arr[currRow][currCol]);

            // add cell to boolean check
            check[currRow][currCol] = true;

            // Get index for next location
            int newRow = currRow + directionRow[direction];
            int newCol = currCol + directionCol[direction];

            // Condition to see if the index is in bounds and not checked before
            if (0 <= newRow && newRow < rowSize && 0 <= newCol && newCol < colSize
                    && !check[newRow][newCol]) {

                // Move to the next row
                currRow = newRow;
                // Move to the next column
                currCol = newCol;
                
            } else {

                // Change direction, it will iterate in the list in clockwise
                direction = (direction + 1) % 4;

                // New direction for row and column
                currRow += directionRow[direction];
                currCol += directionCol[direction];
            }
        }
        
        // loop to print answer
        for (int num : answer){
            System.out.print(num +" ");            
        };
        System.out.println("");
    }

}