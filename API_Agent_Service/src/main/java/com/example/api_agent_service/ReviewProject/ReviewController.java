package com.example.api_agent_service.ReviewProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ReviewController {

    @Autowired
    private ReviewService reviewService;  // ReviewService는 reviewMapper를 사용하는 서비스 클래스입니다.

    @GetMapping("/getCountByAnswer")
    public Map<String, Object> getCountByAnswers(
            @RequestParam("productName") String productName) {

        Map<String, Object> response = new HashMap<>();

        try {
            // reviewService를 통해 getCountByAnswer 함수 호출
            int PositiveAnswerCount = reviewService.getCount(productName, "긍정");
            int NegativeAnswerCount = reviewService.getCount(productName,"부정");

            // 결과를 JSON 응답에 추가
            response.put("productName", productName);
            response.put("PositiveAnswerCount", PositiveAnswerCount);
            response.put("NegativeAnswerCount",NegativeAnswerCount);
        } catch (Exception e) {
            // 에러가 발생하면 에러 메시지를 응답에 추가
            response.put("error", e.getMessage());
        }
        return response;
    }
}

