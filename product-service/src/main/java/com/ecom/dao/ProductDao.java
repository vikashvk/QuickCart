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

	public List<Product> findAll();
	public Product findByProductId(int prodId);
	public void save(Product prodct);
	public void removeByProductId(int productid);
	
}
