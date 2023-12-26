package com.example.api_agent_service;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.api_agent_service.ReviewProject.Controller.FeedbackController;
import com.example.api_agent_service.ReviewProject.Service.FeedbackService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class FeedbackControllerTest {

    @Mock
    private FeedbackService feedbackService;

    @InjectMocks
    private FeedbackController feedbackController;

    public FeedbackControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetFeedbackByBadReview() {
        // Arrange
        String productName = "오투부스터";
        List<String> negativeFeedback = Arrays.asList("Bad review 1", "Bad review 2");
        List<String> mostNegativeFeedback = Arrays.asList("Worst review 1", "Worst review 2");

        when(feedbackService.getFeedbackReview(productName, "나쁨")).thenReturn(negativeFeedback);
        when(feedbackService.getFeedbackReview(productName, "매우나쁨")).thenReturn(mostNegativeFeedback);

        // Act
        Map<String, Object> response = feedbackController.getFeedbackByBadReview(productName);

        // Assert
        assertNotNull(response);
        assertEquals(negativeFeedback, response.get("NegativeReviewFeedback"));
        assertEquals(mostNegativeFeedback, response.get("MostNegativeReviewFeedback"));
    }
}
