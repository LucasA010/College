package Java.Matrices;

public class practice {

    public static void main(String a[]) {
        int arr[] = {12, 5, 2, 3, 5};
        int minAge = 0;
        int maxAge = 0;

        for (int i = 0; i<arr.length; i++) {
            if (i == 1) {
                minAge = arr[i];
                maxAge = arr[i];
            } else if (arr[i] < minAge) {
                minAge = arr[i];
            } else if (arr[i] > maxAge) {
                maxAge = arr[i];
            }
        }
    }
}