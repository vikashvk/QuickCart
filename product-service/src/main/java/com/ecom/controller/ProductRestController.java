/**
 * 
 */
package com.ecom.controller;

import com.ecom.beans.Product;
import com.ecom.dto.ProductRequest;
import com.ecom.dto.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.ecom.service.ProductServiceImpl;

import java.lang.reflect.Array;
import java.util.List;

/**
 * 
 */
@RestController
@RequestMapping("/api/product")
public class ProductRestController {
	@Autowired
	private ProductServiceImpl productService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProductResponse createProduct(@RequestBody ProductRequest prodRequest){
		return productService.createProduct(prodRequest );
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<ProductResponse> getAllProduct(){
		return productService.getAllProducts();

	}
}
