package com.example.api_agent_service.ReviewProject;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/findByAnswer")
    public ResponseEntity<Map<String, Integer>> findByCountAnswer(@RequestParam("productAnswer") String productAnswer,
                                                             @RequestParam("productAnswer2") String productAnswer2,
                                                                  @RequestParam("productName") String productName) {
        try {
            System.out.println(productName);
            System.out.println(productAnswer);
            System.out.println(productAnswer2);

            int positiveness = reviewService.getCountByAnswer(productName,productAnswer);
            int negativeness = reviewService.getCountByAnswer(productName,productAnswer2);

            Map<String, Integer> response = new HashMap<>();
            response.put("positiveness", positiveness);
            response.put("negativeness", negativeness);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle exceptions appropriately, e.g., log and return a 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

