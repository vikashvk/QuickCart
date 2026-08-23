package com.ecom.microservices.inventory_service.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI inventoryServiceAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Inventory Service APIs")
                        .description("A REST API endpoint that will check whether products are in Stock")
                        .version("v0.0.1"))
                .externalDocs(new ExternalDocumentation()
                        .description("Checkout our Github Repository- Inventory Service")
                        .url("https://github.com/vikashvk/QuickCart#inventory-service"));
    }
}
