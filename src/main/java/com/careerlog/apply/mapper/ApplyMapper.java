package com.careerlog.apply.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.careerlog.apply.dto.ApplyDto;

@Mapper
public interface ApplyMapper {
	List<ApplyDto> selectApplyList(Map<String, Object> paramMap);
	int selectApplyTotalCount();	
}
