package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	
//	List<Users> findbyName(String name);
//	
//	List<Users> findByNameAndEmail(String name, String email);
//	
//	
//	@Query(value = "Select * from users u where u.email=?1", nativeQuery = true)
//	Users findbyEmail(String email);
//	
//	@NativeQuery(value = "select * from users where u.name=?1 OR u.email=?2 ")
//	Users findByNameorEmail(String name, String email);
	
}
