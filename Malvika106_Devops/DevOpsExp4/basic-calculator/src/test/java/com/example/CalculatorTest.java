package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the Calculator class.
 */
class CalculatorTest {

    private final Calculator calculator = new Calculator();

    @Test
    void testAdd() {
        assertEquals(5, calculator.add(2, 3), "2 + 3 should equal 5");
    }

    @Test
    void testSubtract() {
        assertEquals(10, calculator.subtract(15, 5), "15 - 5 should equal 10");
    }

    @Test
    void testMultiply() {
        assertEquals(20, calculator.multiply(4, 5), "4 * 5 should equal 20");
    }

    @Test
    void testDivide() {
        assertEquals(2.5, calculator.divide(5, 2), "5 / 2 should equal 2.5");
    }

    @Test
    void testDivideByZero() {
        // Test that an exception is thrown when dividing by zero
        assertThrows(IllegalArgumentException.class, () -> {
            calculator.divide(1, 0);
        }, "Dividing by zero should throw IllegalArgumentException");
    }
}
