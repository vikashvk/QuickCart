package com.ecom.order.dto;

import java.math.BigDecimal;

public record OrderResponse(String orderNumber,
                            String skuCode,
                            Integer quantity,
                            BigDecimal price,
                            String status){}
