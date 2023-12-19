package com.example.api_agent_service.ReviewProject.Controller;

import com.example.api_agent_service.ReviewProject.Feedback;
import com.example.api_agent_service.ReviewProject.Review;
import com.example.api_agent_service.ReviewProject.DTO.FeedbackDTO;
import com.example.api_agent_service.ReviewProject.Service.FeedbackService;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Tag(name = "사용자", description = "사용자 관련 API")
@RestController
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @Operation(summary = "제품별 부정적 리뷰 분석")
    @ApiResponse(responseCode = "200", description = "성공적인 응답", content = @Content(schema = @Schema(implementation = FeedbackDTO.class)))
    @GetMapping("/getFeedbackReview")
    public Map<String, Object> getFeedbackByBadReview(
            @Parameter(description = "조회할 제품명")  @RequestParam("productName") String productName) {

        Map<String, Object> response = new HashMap<>();

        try {
            // reviewService를 통해 getCountByAnswer 함수 호출

            List<String> NegativeReviewFeedback = feedbackService.getFeedbackReview(productName,"나쁨");
            List<String> MostNegativeReviewFeedback = feedbackService.getFeedbackReview(productName,"매우나쁨");
            List<String> SelectProduct = feedbackService.getProductName();

            response.put("NegativeReviewFeedback",NegativeReviewFeedback);
            response.put("MostNegativeReviewFeedback",MostNegativeReviewFeedback);

            response.put("SelectProduct",SelectProduct);
            response.put("productName",productName);

            List<String> NegativeTypeFeedback = feedbackService.getFeedbackType(productName,"나쁨");
            List<String> MostNegativeTypeFeedback = feedbackService.getFeedbackType(productName, "매우나쁨");

            response.put("NegativeTypeFeedback" ,NegativeTypeFeedback);
            response.put("MostNegativeTypeFeedback",MostNegativeTypeFeedback);


            List<String> NegativeImproveFeedback = feedbackService.getFeedbackImprove(productName, "나쁨");
            List<String> MostNegativeImproveFeedback = feedbackService.getFeedbackImprove(productName,"매우나쁨");

            response.put("NegativeImproveFeedback",NegativeImproveFeedback);
            response.put("MostNegativeImproveFeedback",MostNegativeImproveFeedback);


        } catch (Exception e) {
            // 에러가 발생하면 에러 메시지를 응답에 추가
            response.put("error", e.getMessage());
        }
        return response;
    }
}
