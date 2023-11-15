package com.example.api_agent_service.ReviewProject;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

    public  ReviewService reviewService;
    public ReviewController( ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/findByPorN")
    public ResponseEntity<Integer> findByPorN(@RequestParam("PorN") String PorN) {
        try {
            int result = reviewService.getCountByPorN(PorN);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // Handle exceptions appropriately, e.g., log and return a 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}