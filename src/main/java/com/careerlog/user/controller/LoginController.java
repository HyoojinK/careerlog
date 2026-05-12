package com.careerlog.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.careerlog.user.dto.UserDto;
import com.careerlog.user.mapper.UserMapper;

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
	public String loginCheck(HttpSession session, UserDto loginInfo, RedirectAttributes rttr) {
		
		String userId = loginInfo.getUserId();
		
		if(userId.equals("admin"))
		{
			session.setAttribute("loginUser", userId);
			return "redirect:/page/dashboard";
		}
		
		UserDto userInfo = userMapper.findByUserId(loginInfo.getUserId());
		
		if(userInfo != null)
		{
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			boolean match = encoder.matches(loginInfo.getPassword(), userInfo.getPassword());

			if(match)
			{
				userMapper.updateLastLogin(userInfo.getUserId());
				session.setAttribute("userInfo", userInfo);

				return "redirect:/page/dashboard";
			}
		}

		rttr.addFlashAttribute("msg", "아이디 또는 비밀번호가 일치하지 않습니다.");
		return "redirect:/login";
	}
	
}
