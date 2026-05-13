package com.careerlog.apply.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.careerlog.apply.dto.ApplyDto;
import com.careerlog.apply.mapper.ApplyMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class ApplyController {
	
	@Autowired
	private ApplyMapper applyMapper;
	
	@RequestMapping(value="/selectApplyGridData", method={RequestMethod.GET, RequestMethod.POST}, produces="application/json; charset=UTF-8")//	public @ResponseBody void selectGridData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
	public @ResponseBody Map<String, Object> selectGridData(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		String drawParam = request.getParameter("draw");
		String startParam = request.getParameter("start");
		String lengthParam = request.getParameter("length");
		int draw = 0;
		int start = 0;
		int length = 30;

		if(drawParam != null)
		{
			draw = Integer.parseInt(drawParam);
		}

		if(startParam != null)
		{
			start = Integer.parseInt(startParam);
		}

		if(lengthParam != null)
		{
			length = Integer.parseInt(lengthParam);
		}

		Map<String, Object> paramMap = new HashMap<String, Object>();

		paramMap.put("start", start);
		paramMap.put("length", length);

		List<ApplyDto> applyList = applyMapper.selectApplyList(paramMap);

		int totalCount = applyMapper.selectApplyTotalCount();

		resultMap.put("draw", draw);
		resultMap.put("data", applyList);
		resultMap.put("recordsTotal", totalCount);
		resultMap.put("recordsFiltered", totalCount);

		return resultMap;
	}
}
