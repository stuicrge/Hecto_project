package com.example.api_agent_service.ReviewProject;
import lombok.*;

@Data
// 또박케어 상품 리뷰 DB
public class Review {

    private int id;

    private String productName;

    private String title;

    private String content;

    private String date;

    private String gpt_answer;

    public Review(String productName, String title, String content, String date, String gpt_answer) {
        this.productName = productName;
        this.title = title;
        this.content = content;
        this.date = date;
        this.gpt_answer = gpt_answer;

    }
}
