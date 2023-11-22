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

    @GetMapping("/findByAnswer")
    public String findByAnswer(@RequestParam("answer") String answer) {
        try {
            int result = reviewService.getCountByAnswer(answer);
            return  result+"" ;
//            return "  { \"result\" : result } ";
        } catch (Exception e) {
            // Handle exceptions appropriately, e.g., log and return a 500 Internal Server Error
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return "" ;
    }
}