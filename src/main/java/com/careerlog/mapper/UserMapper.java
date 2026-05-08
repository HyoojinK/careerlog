package com.careerlog.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.careerlog.dto.UserDto;

@Mapper
public interface UserMapper {
	UserDto findByUserId(String userId);
	void updateLastLogin(String userId);
}
