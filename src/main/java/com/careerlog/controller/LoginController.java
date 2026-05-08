package com.careerlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.careerlog.dto.UserDto;
import com.careerlog.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {
	
	@Autowired
	private UserMapper userMapper;
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@PostMapping("/loginCheck")
	public String loginCheck(HttpSession session, UserDto LoginInfo, RedirectAttributes rttr) {
		
		UserDto userInfo = userMapper.findByUserId(LoginInfo.getUserId());
		if( userInfo != null )
		{
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			boolean match = encoder.matches( LoginInfo.getPassword(), userInfo.getPassword());
			
			if(match)
			{
				userMapper.updateLastLogin(userInfo.getUserId());
				session.setAttribute("userInfo", userInfo);
				return "redirect:/home";
			}
		}
		rttr.addFlashAttribute("msg", "아이디 또는 비밀번호가 일치하지 않습니다.");
		return "redirect:/login";
	}
	
	
}
