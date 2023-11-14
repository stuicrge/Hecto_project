package com.example.api_agent_service.ReviewProject;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewMapper reviewMapper;

    @Autowired
    public ReviewController(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    @GetMapping("/findByPorN")
    public ResponseEntity<Integer> findByPorN(@RequestParam String PorN) {
        try {
            int result = reviewMapper.findByPorN(PorN);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // Handle exceptions appropriately, e.g., log and return a 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}