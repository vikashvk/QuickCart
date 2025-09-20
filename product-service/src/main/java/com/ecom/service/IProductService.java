package com.ecom.service;

import java.util.List;

import com.ecom.beans.Product;

public interface IProductService {

	String save(Product product);
	List<Product> findAll();
	Product findById(int prodId);
	void removeById(int productid);
	void updateProduct(int itemid, Product product);
}
