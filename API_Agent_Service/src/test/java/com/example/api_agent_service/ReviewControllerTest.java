package com.example.api_agent_service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.api_agent_service.ReviewProject.Controller.ReviewController;
import com.example.api_agent_service.ReviewProject.Service.ReviewService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Map;

@SpringBootTest
public class ReviewControllerTest {

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    public ReviewControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetCountByAnswers() {
        // Arrange
        String productName = "오투부스터";
        when(reviewService.getCount(productName, "매우좋음")).thenReturn(10);
        when(reviewService.getCount(productName, "좋음")).thenReturn(20);
        when(reviewService.getCount(productName, "보통")).thenReturn(30);

        // Act
        Map<String, Object> response = reviewController.getCountByAnswers(productName);

        // Assert
        assertNotNull(response);
        assertEquals(10, response.get("MostPositiveAnswerCount"));
        assertEquals(20, response.get("PositiveAnswerCount"));
        assertEquals(30, response.get("NormalAnswerCount"));
    }
}
