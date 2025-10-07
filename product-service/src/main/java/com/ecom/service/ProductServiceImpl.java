/**
 *
 */
package com.ecom.service;

import java.util.List;

import com.ecom.dto.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import com.ecom.beans.Product;
import com.ecom.dao.ProductDao;

/**
 *
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl {

    private final ProductDao productDao;

    public void createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .prodName(productRequest.name())
                .description(productRequest.description())
                .prodPrice(productRequest.price())
                .build();
        productDao.save(product);
        log.info("Saved Successfully");
    }
}
