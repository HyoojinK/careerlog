package com.careerlog.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PageController {
	@GetMapping("/")
	public String home()
	{
		return "redirect:/page/dashboard";
	}

	@GetMapping("/page/{view}")
	public String moveView(@PathVariable String view)
	{
		return view;
	}
	
}
