package com.ecom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.beans.User;
import java.util.List;


public interface UserDao extends JpaRepository<User,Integer>{
	
	List<User> findByUserId(Integer userId);
	
}
