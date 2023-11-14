package com.example.api_agent_service;

import com.example.api_agent_service.mapper.ReviewMapper;
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

        System.out.println(this.reviewMapper.findByPorN("P"));
        System.out.println(this.reviewMapper.findByPorN("N"));

    }
}
