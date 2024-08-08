package com.ecom.service;

import java.util.List;

import com.ecom.beans.Product;

public interface IProductService {

	public String save(Product product);
	public List<Product> findAll();
	public Product findById(int prodId);
	public void removeById(int productid);
	public void updateProduct(int itemid, Product product);
}
