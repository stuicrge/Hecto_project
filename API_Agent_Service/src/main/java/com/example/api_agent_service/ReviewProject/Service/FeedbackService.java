package com.example.api_agent_service.ReviewProject.Service;

import com.example.api_agent_service.ReviewProject.Mapper.FeedbackMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackMapper feedbackMapper;

    @Autowired
    public FeedbackService(FeedbackMapper feedbackMapper){
        this.feedbackMapper =feedbackMapper;
    }

    public List<String> getFeedbackReview(String productName, String gpt_answer) {
        return feedbackMapper.selectFeedbackReview(productName,gpt_answer);

    }

    public List<String> getFeedbackType(String productName, String gpt_answer){
        return feedbackMapper.selectFeedbackType(productName,gpt_answer);
    }
    public List<String> getFeedbackImprove(String productName, String gpt_answer){
        return feedbackMapper.selectFeedbackImprove(productName, gpt_answer);
    }
    public List<String> getProductName(){
        return feedbackMapper.selectAnswerName();
    }



}
