package com.example.api_agent_service.ReviewProject;

import lombok.Data;

@Data
public class CompareReview {

    private int id;
    private String name;
    private String content;
    private String gpt_answer;
    private String date;

    public CompareReview(int id, String name, String content, String gpt_answer, String date){

        this.id = id;
        this.name = name;
        this.content = content;
        this.gpt_answer = gpt_answer;
        this.date = date;

    }



}
