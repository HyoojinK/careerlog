package com.careerlog.apply.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyDto {

	private String companyId;

	private String userId;

	private String companyName;

	private String applyStatus;

	private String applyDate;

	private String recruitUrl;

	private String jobPosition;

	private String workType;

	private String salary;

	private String managerName;

	private String managerEmail;

	private String managerPhone;

	private String memo;

	private String favoriteYn;

	private String nextScheduleDt;

	private LocalDateTime regDt;

	private LocalDateTime updtDt;

}