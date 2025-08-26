package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class AppTest {
    @Test
    void addsCorrectly() {
        assertEquals(7, App.add(3,4));
    }
}
