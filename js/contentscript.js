$(document).ready(function() {
	function removeElements(){
		$("aside#right-side").children('div').remove();
		$("aside#right-side").children('h2').remove();
		$("aside#right-side").children('ul').remove();
	}
	
	function addDivs(){
		$("aside#right-side").prepend('<div id="demo" class="events_list"><div class="assignment-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div class="grade-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="calendar"><h2>Calendar</h2><div class="calendar-div"></div></div>');
	}
	
    function getAssignments() {
		var key = localStorage["canvasKey"];
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/assignments',
			data:{
				'Authorization': key
			},
			success: function(data){
				var response = $(data);
				var upcoming = response.find(".assignment_list:eq(2)");
				$(".assignment-summary-div").html(upcoming);
			},
			error: function(data){
				var resp = $(data);
				$(".assignment-summary-div").html("<h2>Upcoming Assignments</h2><span style='color: red'>Error retrieving your assignments.</span>");
				//alert(resp + 'There was an error trying to retrieve your assignments');
			}
		});
		
    }
	
	function getCalendar() {
	var key = localStorage["canvasKey"];
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/calendar',
			data:{
				'Authorization': key
			},
			success: function(data){
				var response = $(data);
				var upcoming = response.find(".mini_month");
				$(".calendar-div").html(upcoming);
			},
			error: function(data){
				var resp = $(data);
				$(".calendar-div").html("<span style='color: red'>Error retrieving your calendar.</span>");
				//alert(resp + 'There was an error trying to retrieve your Calendar');
			}
		});
		
    }
	
	function getGrades(){
		$(".grade-summary-div").load("https://lms.neumont.edu/grades .course_details");
	}
	
	
	
	
	
	removeElements();
    addDivs();
	
	getAssignments();
	getCalendar();
	getGrades();
});

