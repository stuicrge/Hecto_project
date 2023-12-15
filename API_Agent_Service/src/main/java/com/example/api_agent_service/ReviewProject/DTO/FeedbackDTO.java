package com.example.api_agent_service.ReviewProject.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FeedbackDTO {
    List<String> NegativeReviewFeedback;
    List<String> MostNegativeReviewFeedback;
    List<String> NegativeTypeFeedback;
    List<String> MostNegativeTypeFeedback;
    List<String> NegativeImproveFeedback;
    List<String> MostNegativeImproveFeedback;



}
