package com.example.api_agent_service.ReviewProject.DTO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
public class ReviewDTO{
    String productName ;
    int MostPositiveAnswerCount;
    int PositiveAnswerCount;
    int NormalAnswerCount;
    int MostNegativeAnswerCount;
    int NegativeAnswerCount;
    List<String> SelectProduct;
    int AllAnswerCount;
}
