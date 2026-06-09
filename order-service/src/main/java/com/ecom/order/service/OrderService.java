package com.ecom.order.service;

import com.ecom.order.client.InventoryClient;
import com.ecom.order.dao.OrderRepository;
import com.ecom.order.dto.OrderRequest;
import com.ecom.order.model.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
private final InventoryClient inventoryClient;
    public void placeOrder(OrderRequest orderRequest) {
        boolean isInStock= inventoryClient.isInStock(orderRequest.skuCode(),orderRequest.qty());
        //map orderRequest to Order Object
        if(isInStock) {
            Order order = new Order();
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setPrice(orderRequest.price());
            order.setQuantity(orderRequest.qty());
            order.setSkuCode(orderRequest.skuCode());

            //save order to repo
            orderRepository.save(order);
            log.info("Saved in repo");
        }
        else {
            throw new RuntimeException("Product with skuCode "+orderRequest.skuCode()+" is Out of Stock");
        }
    }
}
