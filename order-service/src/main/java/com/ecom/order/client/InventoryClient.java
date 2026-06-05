package com.ecom.order.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value="inventory",url="")
public interface InventoryClient {
}
