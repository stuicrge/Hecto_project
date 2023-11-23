package com.example.api_agent_service;
import com.example.api_agent_service.ReviewProject.ReviewMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {
    private final ReviewMapper reviewMapper;
    public Main(ReviewMapper reviewMapper){
        this.reviewMapper = reviewMapper;
    }
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(this.reviewMapper.findByAnswer("긍정"));
        System.out.println(this.reviewMapper.findByAnswer("부정"));


    }
}
