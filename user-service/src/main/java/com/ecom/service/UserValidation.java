/**
 * 
 */
package com.ecom.service;

import com.ecom.beans.User;

/**
 * 
 */
public interface UserValidation {

	public User findById(int userId);
	public String save(User user);


}
