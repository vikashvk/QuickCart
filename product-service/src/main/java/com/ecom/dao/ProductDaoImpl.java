/**
 * 
 */
package com.ecom.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ecom.beans.Product;

import jakarta.persistence.EntityManager;

/**
 * 
 */
@Repository
public class ProductDaoImpl implements ProductDao {

	private EntityManager entityManager;
	
	@Override
	public void save(Product product) {
		entityManager.persist(product);
	}
	
	@Override
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product findByProductId(int prodId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeByProductId(int productid) {
		// TODO Auto-generated method stub

	}

}
