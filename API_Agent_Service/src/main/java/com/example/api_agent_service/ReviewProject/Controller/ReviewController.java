package com.example.api_agent_service.ReviewProject.Controller;
import com.example.api_agent_service.ReviewProject.DTO.ReviewCompareDTO;
import com.example.api_agent_service.ReviewProject.DTO.ReviewDTO;
import com.example.api_agent_service.ReviewProject.Review;
import com.example.api_agent_service.ReviewProject.Service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Tag(name = "사용자", description = "사용자 관련 API")
@RestController
public class ReviewController {

    @Autowired
    private ReviewService reviewService;  // ReviewService는 reviewMapper를 사용하는 서비스 클래스입니다.


    // Swagger사용을 위한 어노테이션들 (@Operation)(ApiResponse)
    @Operation(summary = "제품별 리뷰 통계 수집")
    @ApiResponse(responseCode = "200", description = "성공적인 응답", content = @Content(schema = @Schema(implementation = ReviewDTO.class))) // Schema 구조를 보여주는 어노테이션
    @GetMapping("/getCountByAnswer")
    public Map<String, Object> getCountByAnswers(@Parameter(description = "조회할 제품명") @RequestParam("productName") String productName) {

        Map<String, Object> response = new HashMap<>();


        try {

            // reviewService를 통해 getCount 함수 호출
            int MostPositiveAnswerCount = reviewService.getCount(productName, "매우좋음");
            int PositiveAnswerCount = reviewService.getCount(productName, "좋음");
            int NormalAnswerCount = reviewService.getCount(productName,"보통");
            int MostNegativeAnswerCount = reviewService.getCount(productName,"매우나쁨");
            int NegativeAnswerCount = reviewService.getCount(productName,"나쁨");
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

    @Operation(summary = "타사 제품과의 선호도 비교")
    @ApiResponse(responseCode = "200", description = "성공적인 응답", content = @Content(schema = @Schema(implementation = ReviewCompareDTO.class)))
    @GetMapping("/CompareReviews")
    public Map<String, Object> getCompareAnswers(@Parameter(description = "조회할 제품명") @RequestParam("productName") String productName, @Parameter(description = "비교할 제품명") @RequestParam("name") String name){

        Map<String, Object> response = new HashMap<>();

        try {
            DecimalFormat percentageFormat = new DecimalFormat("#.##");

            // reviewService를 통해 getCount 함수 호출
            int MostPositiveAnswerCount = reviewService.getCount(productName, "매우좋음");
            int PositiveAnswerCount = reviewService.getCount(productName, "좋음");
            int NormalAnswerCount = reviewService.getCount(productName,"보통");
            int MostNegativeAnswerCount = reviewService.getCount(productName,"매우나쁨");
            int NegativeAnswerCount = reviewService.getCount(productName,"나쁨");
            int AllAnswerCount = reviewService.getAllProduct(productName);


            // reviewService를 통해 getCompareCount 함수 호출
            int MostPositiveCompareCount = reviewService.getCompareCount(name,"매우좋음");
            int PositiveCompareCount = reviewService.getCompareCount(name,"좋음");
            int NormalCompareCount  = reviewService.getCompareCount(name,"보통");
            int MostNegativeCompareCount = reviewService.getCompareCount(name,"매우나쁨");
            int NegativeCompareCount = reviewService.getCompareCount(name,"나쁨");
            int AllCompareCount = reviewService.getAllCompare(name);

            List<String> SelectDesimone = reviewService.getDesimone("드시모네");

            // 또박케어 5지선다 대답 비율

            double MostPositiveAnswerPer = ((double) MostPositiveAnswerCount / AllAnswerCount) * 100;
            double PositiveAnswerPer = ((double) PositiveAnswerCount / AllAnswerCount) * 100;
            double NormalAnswerPer = ((double) NormalAnswerCount / AllAnswerCount) * 100;
            double NegativeAnswerPer = ((double) NegativeAnswerCount / AllAnswerCount) * 100;
            double MostNegativeAnswerPer = ((double) MostNegativeAnswerCount / AllAnswerCount) * 100;

            // 락토핏 5지선다 대답 비율

            double MostPositiveComparePer = ((double) MostPositiveCompareCount / AllCompareCount) * 100;
            double PositiveComparePer = ((double) PositiveCompareCount / AllCompareCount) * 100;
            double NormalComparePer = ((double) NormalCompareCount / AllCompareCount) * 100;
            double NegativeComparePer = ((double) NegativeCompareCount / AllCompareCount) * 100;
            double MostNegativeComparePer = ((double) MostNegativeCompareCount / AllCompareCount) * 100;



            //또박케어 데이터
            response.put("SelectDesimone",SelectDesimone);
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

