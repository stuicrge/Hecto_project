package com.example.api_agent_service.ReviewProject;

import lombok.Data;
// GPTSERVICE에서 부정 후기 개선점 리뷰 DB
@Data
public class Feedback {

    private String productName;
    private String review;
    private String gpt_answer;
    private String type;
    private String improvement;

    public Feedback(String productName, String review, String gpt_answer,String type,String improvement){
        this.productName = productName;
        this.review = review;
        this.gpt_answer = gpt_answer;
        this.type = type;
        this.improvement = improvement;
    }

}
