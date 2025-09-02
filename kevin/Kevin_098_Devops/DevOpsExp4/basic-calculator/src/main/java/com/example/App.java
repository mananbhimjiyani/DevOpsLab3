package com.example;

/**
 * Main application class to run the calculator.
 */
public class App {
    public static void main(String[] args) {
        Calculator calculator = new Calculator();

        int sum = calculator.add(10, 5);
        System.out.println("10 + 5 = " + sum);

        int difference = calculator.subtract(10, 5);
        System.out.println("10 - 5 = " + difference);

        int product = calculator.multiply(10, 5);
        System.out.println("10 * 5 = " + product);

        double quotient = calculator.divide(10, 5);
        System.out.println("10 / 5 = " + quotient);
    }
}
