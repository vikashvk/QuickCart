package com.ecom.microservices.inventory_service.repository;

import com.ecom.microservices.inventory_service.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
        boolean existsBySkuCodeAndQuantityIsGreaterThanEqual(String skuCode, int quantity);
}
