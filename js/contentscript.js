$(document).ready(function() {

	function login(){
		
	}
	function removeElements(){
		$("aside#right-side").children('div').remove();
		$("aside#right-side").children('h2').remove();
		$("aside#right-side").children('ul').remove();
	}
	
	function addDivs(){
		$("aside#right-side").prepend('<div class="events_list"><h2>Upcoming Assignments</h2><div class="assignment-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div class="grade-summary-div"></div></div>');
	}
	
    function auth() {
		// $.ajax({
			// type: 'GET',
			// url: 'https://lms.neumont.edu/api/v1/courses',
			// data:{
				// 'client_id' : '5',
				// 'response_type': 'code',
				// 'redirect_uri' : 'urn:ietf:wg:oauth:2.0:oob'
				//'Authorization': 'pVQ51V8VPAnWOrmo8i0Fy1sssV4MIzSy94O103LOZAFuqqe4V40LoM3QowuM4fND'
			// },
			// success: function(){
				// alert('works');
			// }
		// });
		
    }
	
	function getInfo(){
		$(".grade-summary-div").load("grades .course_details");
		$(".assignment-summary-div").load("assignments div.assignment_list");
	}
	
	removeElements();
    addDivs();
	//auth();
	getInfo();
});
