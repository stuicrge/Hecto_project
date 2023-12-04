package com.example.api_agent_service.ReviewProject.Service;
import com.example.api_agent_service.ReviewProject.Mapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewMapper reviewMapper;

    @Autowired
    public ReviewService(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    // 또박케어 감정 질의의 개수를 출력
    public int getCount( String productName , String productAnswer) {
        return reviewMapper.selectAnswerCount(productName, productAnswer);
    }
    // 락토핏의 감정 질의의 개수를 출력
    public int getCompareCount(String name, String gpt_answer){
        return reviewMapper.comepareAnswerCount(name,gpt_answer);
    }
}
