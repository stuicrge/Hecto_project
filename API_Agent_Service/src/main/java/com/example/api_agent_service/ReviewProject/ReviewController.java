package com.example.api_agent_service.ReviewProject;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/findByAnswer")
    public ResponseEntity<Map<String, Integer>> findByAnswer(@RequestParam("answer") String answer) {
        try {
            int result = reviewService.getCountByAnswer(answer);
            Map<String, Integer> response = Collections.singletonMap("result", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle exceptions appropriately, e.g., log and return a 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

