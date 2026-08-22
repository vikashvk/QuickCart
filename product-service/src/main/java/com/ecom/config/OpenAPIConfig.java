package com.ecom.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI productServiceAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Product Service APIs")
                        .description("A REST API endpoint that will CREATE and READ products")
                        .version("v0.0.1"))
                .externalDocs(new ExternalDocumentation()
                        .description("Checkout our Github Repository")
                        .url("https://github.com/vikashvk/QuickCart#product-service"));
    }
    }
