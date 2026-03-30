package com.ecom.order.service;

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
    public void placeOrder(OrderRequest orderRequest) {
        //map orderRequest to Order Object
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setPrice(orderRequest.price());
        order.setQuantity(orderRequest.qty());
        order.setSkuCode(orderRequest.skuCode());

        //save order to repo
        orderRepository.save(order);
        log.info("Saved in repo");
    }
}
