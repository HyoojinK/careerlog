package com.careerlog.user.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

	private String userId;

	private String password;

	private String name;

	private LocalDateTime regDt;

	private LocalDateTime updDt;

	private LocalDateTime lastLoginDt;
}