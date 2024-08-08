/**
 * 
 */
package com.ecom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecom.beans.Product;
import com.ecom.dao.ProductDao;

/**
 * 
 */
@Service
public class ProductServiceImpl implements IProductService {

	private ProductDao productDao;
	
	@Override
	public String save(Product product) {
		productDao.save(product);
		return "Added Successfully";
	}

	@Override
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product findById(int prodId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeById(int productid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateProduct(int itemid, Product product) {
		// TODO Auto-generated method stub

	}

}
