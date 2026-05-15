$(function(){
	applyGrid.load('#applyGrid');
	$('#applyEdit').on('click', function(){
		$('.detail_value').attr('disabled', false);
		$('#changeStatus').show();
	})
		
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
		
		mv_applyGridParam = {};
		var columns = [
			{
				title : "",
				data : "favoriteYn",
				width : "40px",
				className : "dt-center",
				defaultContent : "",
				render: function(data, type, row, meta)
				{
					if(data == 'Y')
					{
						return '<button class="favorite favorite_y"></button>';
					}

					return '<button class="favorite favorite_n"></button>';
				}			
			},
			{
				title : "회사명",
				data : "companyName",
				width : "140px",
				className : "dt-left",
				defaultContent : ""
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
			}
		];

		var options = {
			retrieve: true,
			paginate: true,
			pagingType: "simple_numbers",
			autoWidth: false,
			scrollX: false,
			ordering: false,
			searching: false,
			info: false,
			lengthChange: false,
			pageLength: 10,
			dom: 'rt<"dt_bottom"p>',
			processing: true,
			serverSide: true,
			language:
			{
				processing: '<div class="dt-loading"><i class="dt-loading-spiner"></i></div>',
				emptyTable: '등록된 지원 회사가 없습니다.',
				zeroRecords: '검색 결과가 없습니다.',
				paginate:
				{
					previous: '‹',
					next: '›'
				}
			},
			ajax:
			{
				url: "/selectApplyGridData",
				type: "POST",
				dataSrc: "data",
				data: function(d)
				{
					for(var key in mv_applyGridParam)
					{
						d[key] = mv_applyGridParam[key];
					}
				}
			},
			columns : columns,
			drawCallback: function(settings)
			{
				var api = this.api();
				var pageInfo = api.page.info();

				if(pageInfo.pages <= 1)
				{
					$(api.table().container()).find('.dt_bottom').hide();
				}
				else
				{
					$(api.table().container()).find('.dt_bottom').show();
				}
			}
		};
		
		mv_applyGridObj = $(gridId).on('preXhr.dt', function(e, settings, data) { // ajax 로드 전	
			
		}).on('xhr.dt', function(e, settings, len) { // ajax 로드 후
			
		}).on('page.dt', function () {
			
		}).on('init.dt', function() { // 전체 완료 후
				applyGrid.event(gridId);
		}).DataTable(options);
	},
	
	event: function(gridId) {
		var $grid = $(gridId);

		$grid.find('tbody').on('click', 'td', function() {
			var $this = $(this);
			$this.parents('tbody').children('tr').removeClass('dt-active')
			$this.parent('tr').addClass('dt-active');
			var rd = mv_applyGridObj.row(this.parentElement).data();
			setApplyInfo(rd);
		});
		
		$grid.find('tbody').on('dblclick', 'td', function(e) {
			var rd = mv_applyGridObj.row(this.parentElement).data();
		
		});
	}
}

function setApplyInfo(data){
	$('#emptyInfo').hide();
	$('#applyInfo').show();
	
	var applyStatus = "";
	var applyStatusClass = "";
	switch(Number(data.applyStatus))
	{
		case 0:
		{
			applyStatus = "지원 취소";
			applyStatusClass = "cancelled";
			break;
		}

		case 1:
		{
			applyStatus = "지원 완료";
			applyStatusClass = "applied";
			break;
		}

		case 2:
		{
			applyStatus = "서류 합격";
			applyStatusClass = "document_pass";
			break;
		}

		case 3:
		{
			applyStatus = "면접 예정";
			applyStatusClass = "interview";
			break;
		}

		case 999:
		{
			applyStatus = "불합격";
			applyStatusClass = "failed";
			break;
		}

		case 111:
		{
			applyStatus = "최종 합격";
			applyStatusClass = "final_pass";
			break;
		}

		default:
		{
			applyStatus = "-";
			applyStatusClass = "";
			break;
		}
	}
	$('#applyStatus')
	.removeClass('cancelled applied document_pass interview failed final_pass')
	.addClass(applyStatusClass)
	.text(applyStatus)
		
	gfn_setText('#applyCompanyName', data.companyName);
	gfn_setText('#applyStatus', applyStatus);

	gfn_setValue('#applyDate', data.applyDate);
	gfn_setValue('#recruitUrl', data.recruitUrl);
	gfn_setValue('#jobPosition', data.jobPosition);
	gfn_setValue('#workType', data.workType);
	gfn_setValue('#salary', data.salary);
	gfn_setValue('#managerName', data.managerName);
	gfn_setValue('#managerEmail', data.managerEmail);
	gfn_setValue('#managerPhone', data.managerPhone);
	gfn_setValue('#memo', data.memo);
}

