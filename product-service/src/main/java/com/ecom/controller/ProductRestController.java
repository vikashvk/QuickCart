/**
 * 
 */
package com.ecom.controller;

import com.ecom.dto.ProductRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.ecom.service.ProductServiceImpl;

/**
 * 
 */
@RestController
@RequestMapping("/api/shop")
public class ProductRestController {

	private ProductServiceImpl productService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createOrder(@RequestBody ProductRequest prodRequest){
		productService.createProduct(prodRequest );
	}
	
}
