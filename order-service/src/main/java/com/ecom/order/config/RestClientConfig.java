package com.ecom.order.config;

import com.ecom.order.client.InventoryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestClientConfig {
    @Bean
    public InventoryClient inventoryClient(){
        
    }
}
