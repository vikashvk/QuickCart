package com.ecom.dto;

import java.math.BigDecimal;

public record ProductResponse(String id, String name, String description, BigDecimal priceSeconds,String category,String imageUrl,boolean inStock) {
}
