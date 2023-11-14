package com.example.api_agent_service.domain;
import lombok.*;

@Data
public class Review {

    private int id;
    private String productName;
    private String title;
    private String content;
    private String PorN;

    // Constructors, getters, and setters are generated by Lombok annotations.
    //@SuppressWarnings("unused")
    public Review(String productName, String title, String content, String PorN) {
        this.productName = productName;
        this.title = title;
        this.content = content;
        this.PorN = PorN;


    }

}
