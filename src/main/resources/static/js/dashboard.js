$(function(){
	applyGrid.load('#applyGrid');
});

var mv_applyData = null;
var mv_applyGridObj;
var mv_applyGridParam;
var applyGrid = {
	reload: function() {
		if(!mv_applyGridObj)
		{
			applyGrid.load('#applyGrid');
			return;
		}
	
		mv_applyGridObj.ajax.reload();
	},
	load: function(gridId) {
		
		mv_applyGridParam =
		{
			previewYn: 'Y'
		};
		
		var columns = [
			{
				title : "회사명",
				data : "companyName",
				width : "150px",
				className : "dt-left",
				defaultContent : ""
			},
			{
				title : "지원직무",
				data : "jobPosition",
				width : "100px",
				className : "dt-left",
				defaultContent : ""
			},
			{
				title : "지원일",
				data : "applyDate",
				width : "120px",
				className : "dt-center",
				defaultContent : "",
				render: function(data, type, row, meta)
				{
					if(!data)
					{
						return '-';
					}

					return data.split(' ')[0];
				}
			},
			{
				title : "지원 상태",
				data : "applyStatus",
				width : "100px",
				className : "dt-center",
				render: function(data, type, row, meta)
				{
					if(data == '0')
					{
						return '<span class="status_badge cancelled">지원 취소</span>';
					}
					else if(data == '1')
					{
						return '<span class="status_badge applied">지원 완료</span>';
					}
					else if(data == '2')
					{
						return '<span class="status_badge document_pass">서류 합격</span>';
					}
					else if(data == '3')
					{
						return '<span class="status_badge interview">면접 예정</span>';
					}
					else if(data == '111')
					{
						return '<span class="status_badge final_pass">최종 합격</span>';
					}
					else if(data == '999')
					{
						return '<span class="status_badge failed">불합격</span>';
					}

					return '<span class="status_badge"></span>';
				}
			},
		];

		var options = {
			retrieve: true,
			paginate: false,
			autoWidth: false,
			scrollX: false,
			ordering: false,
			searching: false,
			info: false,
			lengthChange: false,
			pageLength: 5,
			dom: 'rt',
			processing: true,
			serverSide: false,
			ajax:
			{
				url: "/selectApplyGridData",
				type: "POST",
				data: mv_applyGridParam,
				dataSrc: "data"
			},
			columns: columns
		};
		
		mv_applyGridObj = $(gridId).on('preXhr.dt', function(e, settings, data) { // ajax 로드 전	
			
		}).on('xhr.dt', function(e, settings, len) { // ajax 로드 후
			
		}).on('page.dt', function () {
			
			dtClearPosTop(gridId); // 페이징 처리 시 스크롤 상단으로 이동
			
		}).on('init.dt', function() { // 전체 완료 후

		}).DataTable(options);
	}
}