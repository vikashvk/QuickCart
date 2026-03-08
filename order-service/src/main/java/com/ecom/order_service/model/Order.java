package com.ecom.order_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name="t_orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serial_id;
    private String orderNumber;
    private String skuCode;
    private BigDecimal price;
    private Integer quantity;
}
