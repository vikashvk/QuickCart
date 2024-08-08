/**
 * 
 */
package com.ecom.dao;

import java.util.List;

import com.ecom.beans.Product;

/**
 * 
 */
public interface ProductDao {

	public void save(Product product);
	public List<Product> findAll();
	public Product findByProductId(int prodId);
	public void removeByProductId(int productid);
	
}
