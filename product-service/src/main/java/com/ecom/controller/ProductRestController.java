/**
 * 
 */
package com.ecom.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.service.ProductServiceImpl;

/**
 * 
 */
@RestController
@RequestMapping("/shop")
public class ProductRestController {

	private ProductServiceImpl productService;
	
	
}
