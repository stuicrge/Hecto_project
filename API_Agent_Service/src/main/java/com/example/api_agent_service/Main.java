package com.example.api_agent_service;
import com.example.api_agent_service.ReviewProject.ReviewMapper;
import com.example.api_agent_service.ReviewProject.ReviewService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {
    private final ReviewMapper reviewMapper;

    private final ReviewService reviewService;
    public Main(ReviewMapper reviewMapper, ReviewService reviewService){
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
    }
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(this.reviewMapper.selectAnswerCount("[골프에디션] 오투부스터 (5포)","긍정"));
        System.out.println(this.reviewMapper.selectAnswerCount("[골프에디션] 오투부스터 (5포)","부정"));

        System.out.println(this.reviewService.getCount("[골프에디션] 오투부스터 (5포)","부정"));
        System.out.println(this.reviewService.getCount("[골프에디션] 오투부스터 (5포)","긍정"));
    }


}
