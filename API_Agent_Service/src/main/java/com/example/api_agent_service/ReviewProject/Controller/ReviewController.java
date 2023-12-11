package com.example.api_agent_service.ReviewProject.Controller;

import com.example.api_agent_service.ReviewProject.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
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
            List<String> SelectProduct = reviewService.getProductName();
            int AllAnswerCount = reviewService.getAllProduct(productName);

            // 결과를 JSON 응답에 추가
            response.put("productName",productName);
            response.put("SelectProduct", SelectProduct);
            response.put("MostPositiveAnswerCount",MostPositiveAnswerCount);
            response.put("PositiveAnswerCount", PositiveAnswerCount);
            response.put("NormalAnswerCount",NormalAnswerCount);
            response.put("NegativeAnswerCount",NegativeAnswerCount);
            response.put("MostNegativeAnswerCount",MostNegativeAnswerCount);
            response.put("AllAnswerCount",AllAnswerCount);


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


            DecimalFormat percentageFormat = new DecimalFormat("#.####");

            // reviewService를 통해 getCount 함수 호출
            int MostPositiveAnswerCount = reviewService.getCount(productName, "매우좋음");
            int PositiveAnswerCount = reviewService.getCount(productName, "좋음");
            int NormalAnswerCount = reviewService.getCount(productName,"보통");
            int NegativeAnswerCount = reviewService.getCount(productName,"나쁨");
            int MostNegativeAnswerCount = reviewService.getCount(productName,"매우나쁨");
            int AllAnswerCount = reviewService.getAllProduct(productName);


            // reviewService를 통해 getCompareCount 함수 호출
            int MostPositiveCompareCount = reviewService.getCompareCount(name,"매우좋음");
            int PositiveCompareCount = reviewService.getCompareCount(name,"좋음");
            int NormalCompareCount  = reviewService.getCompareCount(name,"보통");
            int NegativeCompareCount = reviewService.getCompareCount(name,"나쁨");
            int MostNegativeCompareCount = reviewService.getCompareCount(name,"매우나쁨");
            int AllCompareCount = reviewService.getAllCompare(name);

            System.out.print(AllCompareCount);

            // 또박케어 5지선다 대답 비율

            double MostPositiveAnswerPer = (double) MostPositiveAnswerCount / AllAnswerCount;
            double PositiveAnswerPer = (double) PositiveAnswerCount / AllAnswerCount;
            double NormalAnswerPer = (double) NormalAnswerCount / AllAnswerCount;
            double NegativeAnswerPer = (double) NegativeAnswerCount / AllAnswerCount;
            double MostNegativeAnswerPer = (double) MostNegativeAnswerCount / AllAnswerCount;

            // 락토핏 5지선다 대답 비율

            double MostPositiveComparePer = (double) MostPositiveCompareCount / AllCompareCount;
            double PositiveComparePer = (double) PositiveCompareCount / AllCompareCount;
            double NormalComparePer = (double) NormalCompareCount / AllCompareCount;
            double NegativeComparePer = (double) NegativeCompareCount / AllCompareCount;
            double MostNegativeComparePer = (double) MostNegativeCompareCount / AllCompareCount;

            List<String> SelectProduct = reviewService.getProductName();

            //또박케어 데이터
            response.put("SelectProduct",SelectProduct);

            response.put("productName", productName);
            response.put("MostPositiveAnswerCount",MostPositiveAnswerCount);
            response.put("PositiveAnswerCount", PositiveAnswerCount);
            response.put("NormalAnswerCount",NormalAnswerCount);
            response.put("NegativeAnswerCount",NegativeAnswerCount);
            response.put("MostNegativeAnswerCount",MostNegativeAnswerCount);
            response.put("AllAnswerCount",AllAnswerCount);

            // 락토핏 데이터
            response.put("name", name);
            response.put("MostPositiveCompareCount",MostPositiveCompareCount);
            response.put("PositiveCompareCount", PositiveCompareCount);
            response.put("NormalCompareCount",NormalCompareCount);
            response.put("NegativeCompareCount",NegativeCompareCount);
            response.put("MostNegativeCompareCount",MostNegativeCompareCount);
            response.put("AllCompareCount",AllCompareCount);
            //또박케어 선호도 퍼센트
            response.put("MostPositiveAnswerPer", Double.parseDouble(percentageFormat.format(MostPositiveAnswerPer)));
            response.put("PositiveAnswerPer", Double.parseDouble(percentageFormat.format(PositiveAnswerPer)));
            response.put("NormalAnswerPer", Double.parseDouble(percentageFormat.format(NormalAnswerPer)));
            response.put("NegativeAnswerPer", Double.parseDouble(percentageFormat.format(NegativeAnswerPer)));
            response.put("MostNegativeAnswerPer", Double.parseDouble(percentageFormat.format(MostNegativeAnswerPer)));

            // 락토핏 선호도 퍼센트
            response.put("MostPositiveComparePer", Double.parseDouble(percentageFormat.format(MostPositiveComparePer)));
            response.put("PositiveComparePer", Double.parseDouble(percentageFormat.format(PositiveComparePer)));
            response.put("NormalComparePer", Double.parseDouble(percentageFormat.format(NormalComparePer)));
            response.put("NegativeComparePer", Double.parseDouble(percentageFormat.format(NegativeComparePer)));
            response.put("MostNegativeComparePer", Double.parseDouble(percentageFormat.format(MostNegativeComparePer)));



        } catch (Exception e) {
            // 에러가 발생하면 에러 메시지를 응답에 추가
            response.put("error", e.getMessage());
        }

        return response;
    }

}

