package com.example.api_agent_service.ReviewProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewMapper reviewMapper;

    @Autowired
    public ReviewService(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    // 다른 서비스 메소드들...
    public int getCount( String productName , String productAnswer) {
        return reviewMapper.selectAnswerCount(productName, productAnswer);
    }
}
