package com.ecom.order.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public interface InventoryClient {

    Logger log=LoggerFactory.getLogger(InventoryClient.class);
    @GetExchange("/api/inventory")
    @CircuitBreaker(name="inventory",fallbackMethod = "fallbackMethod")
    @Retry(name="inventory")
    boolean isInStock(@RequestParam("skuCode") String skuCode, @RequestParam("quantity") Integer quantity);

    default boolean fallbackMethod(String code, Integer qty, Throwable throwable){
        log.info("Cannot get inventory for skuCode {}, failure reason : {}",code,throwable.getMessage());
        return false;
    }
}
