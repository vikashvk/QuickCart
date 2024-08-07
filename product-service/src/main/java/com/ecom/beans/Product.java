/**
 * 
 */
package com.ecom.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * 
 */
@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int prodId;
	private String prodName;
	private String category;
	private double prodPrice;
	private String description;
	
	
	public Product(int prodId, String prodName, String category, double prodPrice, String description) {
		super();
		this.prodId = prodId;
		this.prodName = prodName;
		this.category = category;
		this.prodPrice = prodPrice;
		this.description = description;
	}
	
	public int getProdId() {
		return prodId;
	}
	public void setProdId(int prodId) {
		this.prodId = prodId;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getProdPrice() {
		return prodPrice;
	}
	public void setProdPrice(double prodPrice) {
		this.prodPrice = prodPrice;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	
}
