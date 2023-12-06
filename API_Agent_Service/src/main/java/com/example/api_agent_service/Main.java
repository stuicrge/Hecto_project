package com.example.api_agent_service;
import com.example.api_agent_service.ReviewProject.Mapper.ReviewMapper;
import com.example.api_agent_service.ReviewProject.Service.ReviewService;
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

        System.out.println(this.reviewMapper.selectAnswerCount("[6개월 매월또박] 드시모네 베이비 스텝1 ","매우좋음"));





    }


}
