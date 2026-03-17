package com.ecom.order_service.service;

import com.ecom.order_service.dto.OrderRequest;
import com.ecom.order_service.model.Order;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OrderService {
    public void placeOrder(OrderRequest orderRequest){
//map orderRequest to Order Object
Order order =new Order();
order.setOrderNumber(UUID.randomUUID().toString());
order.setPrice(orderRequest.price());
order.setQuantity(orderRequest.qty());
order.setSkuCode(orderRequest.skuCode());
        //save order to repo
order.
    }
}
