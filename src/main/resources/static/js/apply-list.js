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
		
		mv_applyGridParam = {};
		var columns = [
			{title : "표출순서", data : "companyId", name: "apply_ORDER", width : "50px", className : "dt-center", defaultContent : "", visible: true
//				, render: function(data, type, full, meta) {
//				}
			}
			, {title : "번호", data : "userId", width : "25px", className : "dt-center", defaultContent : "", visible: true}
			, {title : "제목", data : "companyName", width : "280px", className : "dt-left", defaultContent : ""
//				, render: function(data, type, full, meta) {
//				}
			}
			, {title: "사용유무", data: "applyStatus", width: "50px", className: "dt-center", defaultContent: "", visible: true
//				, render: function(data, type, full, meta) {
//				}
			}
		];
		
		var options = {
			responsive: true,
			retrieve: true,
			paginate: true,	// 페이징 활성화 여부
			pagingType: "full_numbers",
			autoWidth: 1920, // 컬럼 자동 사이즈 조절
			autoHeight: true, // 로우 수에 맞게 상하 자동 조절
			scrollX: true, // 좌우 스크롤 사용 여부(true/false) / 고정 된 좌우 길이값(300px)
			scrollY: "auto", // 상하 스크롤 사용 여부(true/false) / 고정된 상하 길이값(300px) / "auto"
			ordering: true, // 헤더 셀 선택 시 선택 된 셀 기준으로 order by 처리
			searching: false, // 텍스트 검색 활성화 여부, serverSide가 true일 경우 조회 된 내용 중에서만 검색한다.
			info: true, // 조회 건 수 표시 여부
			pageLength: 30, // 출력 할 Row 갯 수
			lengthMenu: [[30, 60, 90, -1], [30, 60, 90, "All"]], // 변경할 Row 선택 기준
			dom: 'rt<"bottom"fliBp><"clear">', // 화면 그리는순서 설정 (css영향을 받으니 고정으로 사용할 것) B:버튼 f:검색 l:조회갯수 i:조회건수 p:페이징	
			buttons: [],
			processing: true, // 로딩표시 활성화 여부 true/false
			language: {
				"processing": '<div class="dt-loading"><i class="dt-loading-spiner"></i></div>'
			},
			serverSide: true, // 쿼리를 통한 페이징 처리 활성화 여부
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
			rowReorder: {
				
			},
			rowCallback: function(row, data, index) {
				
			},
			columns : columns
		}
		
		mv_applyGridObj = $(gridId).on('preXhr.dt', function(e, settings, data) { // ajax 로드 전	
			
		}).on('xhr.dt', function(e, settings, len) { // ajax 로드 후
			
		}).on('page.dt', function () {
			
			dtClearPosTop(gridId); // 페이징 처리 시 스크롤 상단으로 이동
			
		}).on('init.dt', function() { // 전체 완료 후
				applyGrid.event(gridId);
			}).DataTable(options);
	},
	
	event: function(gridId) {
		var $grid = $(gridId);
		$grid.find('tbody').on('dblclick', 'td', function(e) {
			var rd = mv_applyGridObj.row(this.parentElement).data();
		
		});
		
		$grid.find('tbody').on('click', 'button.useYn', function() {
			var $this = $(this);
			var rd = mv_applyGridObj.row(this.parentElement).data();
			
		});
		
	}
}