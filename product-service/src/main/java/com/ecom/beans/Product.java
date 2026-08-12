/**
 * 
 */
package com.ecom.beans;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

/**
 * 
 * 
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document
public class Product {

	@Id
	private String prodId;
	private String prodName;
	private BigDecimal priceSeconds;
	private String description;
	private String category;
	private String imageUrl;
	private boolean inStock;

}
