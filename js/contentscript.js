$(document).ready(function() {
	function removeElements(){
		$("aside#right-side").children('div').remove();
		$("aside#right-side").children('h2').remove();
		$("aside#right-side").children('ul').remove();
	}
	
	function addDivs(){
		$("aside#right-side").prepend('<div class="events_list"><h2>Upcoming Assignments</h2><div class="assignment-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div class="grade-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="calendar"><h2>Calendar</h2><div class="calendar-div"></div></div>');
	}
	
    function getAssignments() {
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/assignments',
			success: function(data){
				var response = $(data);
				var upcoming = response.find(".assignment_list:eq(2)");
				
				upcoming.children('h2').remove();
				upcoming.find("div.move").remove();
				upcoming.find("div.links").remove();
				upcoming.find("div.details").remove();
				upcoming.find("div.content").append('<hr>');
				
				var firstFive = upcoming.children('div:eq(5)');
				
				if(firstFive.length == 0){
					$(".assignment-summary-div").html(upcoming);
				}else{
					$(".assignment-summary-div").html(firstFive);
				}
			},
			error: function(data){
				var resp = $(data);
				$(".assignment-summary-div").html("<span style='color: red'>Error retrieving your assignments.</span>");
			}
		});
    }
	
	function getCalendar() {
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/calendar',
			success: function(data){
				var response = $(data);
				var upcoming = response.find(".mini_month");
				$(".calendar-div").html(upcoming);
			},
			error: function(data){
				var resp = $(data);
				$(".calendar-div").html("<span style='color: red'>Error retrieving your calendar.</span>");
			}
		});
    }
	
	function getGrades(){
		$(".grade-summary-div").load("https://lms.neumont.edu/grades .course_details");
	}
	
	removeElements();
    addDivs();
	
	getCalendar();
	getGrades();
	getAssignments();
});

