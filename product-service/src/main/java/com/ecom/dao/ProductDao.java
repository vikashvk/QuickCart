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

	void save(Product product);
	List<Product> findAll();
	Product findByProductId(int prodId);
	void removeByProductId(int productid);
	
}
