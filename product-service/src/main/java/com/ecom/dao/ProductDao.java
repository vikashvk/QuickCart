/**
 * 
 */
package com.ecom.dao;

import java.util.List;

import com.ecom.beans.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * 
 */
public interface ProductDao extends MongoRepository<Product, String> {


}
