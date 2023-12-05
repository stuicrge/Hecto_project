package com.example.api_agent_service.ReviewProject.Controller;

import com.example.api_agent_service.ReviewProject.Service.ReviewService;
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
            int MostPositiveAnswerCount = reviewService.getCount(productName, "매우좋음");
            int PositiveAnswerCount = reviewService.getCount(productName, "좋음");
            int NormalAnswerCount = reviewService.getCount(productName,"보통");
            int NegativeAnswerCount = reviewService.getCount(productName,"나쁨");
            int MostNegativeAnswerCount = reviewService.getCount(productName,"매우나쁨");

            // 결과를 JSON 응답에 추가
            response.put("productName", productName);
            response.put("MostPositiveAnswerCount",MostPositiveAnswerCount);
            response.put("PositiveAnswerCount", PositiveAnswerCount);
            response.put("NormalAnswerCount",NormalAnswerCount);
            response.put("NegativeAnswerCount",NegativeAnswerCount);
            response.put("MostNegativeAnswerCount",MostNegativeAnswerCount);
        } catch (Exception e) {
            // 에러가 발생하면 에러 메시지를 응답에 추가
            response.put("error", e.getMessage());
        }
        return response;
    }


    @GetMapping("/CompareReviews")
    public Map<String, Object> getCompareAnswers(@RequestParam("productName") String productName,
                                                    @RequestParam("name") String name){
        Map<String, Object> response = new HashMap<>();

        try {

            // reviewService를 통해 getCount 함수 호출
            int MostPositiveAnswerCount = reviewService.getCount(productName, "매우좋음");
            int PositiveAnswerCount = reviewService.getCount(productName, "좋음");
            int NormalAnswerCount = reviewService.getCount(productName,"보통");
            int NegativeAnswerCount = reviewService.getCount(productName,"나쁨");
            int MostNegativeAnswerCount = reviewService.getCount(productName,"매우나쁨");


            // reviewService를 통해 getCompareCount 함수 호출
            int MostPositiveCompareCount = reviewService.getCompareCount(name,"매우좋음");
            int PositiveCompareCount = reviewService.getCompareCount(name,"좋음");
            int NormalCompareCount  = reviewService.getCompareCount(name,"보통");
            int NegativeCompareCount = reviewService.getCompareCount(name,"나쁨");
            int MostNegativeCompareCount = reviewService.getCompareCount(name,"매우나쁨");


            //
            response.put("productName", productName);
            response.put("MostPositiveAnswerCount",MostPositiveAnswerCount);
            response.put("PositiveAnswerCount", PositiveAnswerCount);
            response.put("NormalAnswerCount",NormalAnswerCount);
            response.put("NegativeAnswerCount",NegativeAnswerCount);
            response.put("MostNegativeAnswerCount",MostNegativeAnswerCount);

            // 락토핏 데이터
            response.put("name", name);
            response.put("MostPositiveCompareCount",MostPositiveCompareCount);
            response.put("PositiveCompareCount", PositiveCompareCount);
            response.put("NormalCompareCount",NormalCompareCount);
            response.put("NegativeCompareCount",NegativeCompareCount);
            response.put("MostNegativeCompareCount",MostNegativeCompareCount);


        } catch (Exception e) {
            // 에러가 발생하면 에러 메시지를 응답에 추가
            response.put("error", e.getMessage());
        }

        return response;
    }

}

