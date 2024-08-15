/**
 * 
 */
package com.ecom.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.service.UserValidationImpl;

/**
 * 
 */

@RestController
@RequestMapping("/user")
public class UserServiceRestController {
	
	private UserValidationImpl userService;
	

}
