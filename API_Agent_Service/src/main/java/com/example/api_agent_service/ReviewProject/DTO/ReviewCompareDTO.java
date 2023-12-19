package com.example.api_agent_service.ReviewProject.DTO;

import java.util.List;
import lombok.Data;
@Data
public class ReviewCompareDTO {

    String productName;

    List<String> SelectDesimone;

    double MostPositiveAnswerPer;
    double PositiveAnswerPer;
    double NormalAnswerPer;
    double NegativeAnswerPer;
    double MostNegativeAnswerPer;

    // 락토핏 5지선다 대답 비율

    double MostPositiveComparePer;
    double PositiveComparePer;
    double NormalComparePer;
    double NegativeComparePer;
    double MostNegativeComparePer;

}
