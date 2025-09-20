/**
 * 
 */
package com.ecom.service;

import com.ecom.beans.User;

/**
 * 
 */
public interface UserValidation {

	User findById(int userId);
	String save(User user);


}
