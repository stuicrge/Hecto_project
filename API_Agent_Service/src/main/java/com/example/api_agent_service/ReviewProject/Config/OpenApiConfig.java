package com.example.api_agent_service.ReviewProject.Config;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    /**
     * OpenAPI bean 구성
     * @return
     */
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("API 에이전트 서비스")
                .version("1.0")
                .description("상품 후기 통계 조사 및 타사 제품과의 비교, 그리고 부정적 후기 분석");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
