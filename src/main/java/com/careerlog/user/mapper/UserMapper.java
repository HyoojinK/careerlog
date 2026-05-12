package com.careerlog.user.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.careerlog.user.dto.UserDto;

@Mapper
public interface UserMapper {
	UserDto findByUserId(String userId);
	void updateLastLogin(String userId);
}
