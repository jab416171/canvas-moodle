$(document).ready(function() {

	function removeElements(){
		$("aside#right-side").children('div').remove();
		$("aside#right-side").children('h2').remove();
		$("aside#right-side").children('ul').remove();
	}
	
	function addDivs(){
		$("aside#right-side").prepend('<div class="assignments"><h2><a style="float: right; font-size: 10px; font-weight: normal;" class="event-list-view-calendar small-calendar" href="https://lms.neumont.edu/calendar">View Calendar</a>Upcoming Assignments</h2><div class="assignment-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div class="grade-summary-div"></div></div>');
		$("aside#right-side").prepend('<div class="calendar"><h2>Calendar</h2><div class="calendar-div"></div></div>');
	}

    function getAssignments() {
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/assignments',
			success: function(data){
				var response = $(data);
				var upcoming = response.find("div.events_list");

				upcoming.children("h2").remove();
				upcoming.find("div.show-only-from").remove();

				$(".assignment-summary-div").html(upcoming);
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
				var cal = response.find(".mini_month");
				cal.find("img").css('display','none');
				$(".calendar-div").html(cal);
			},
			error: function(data){
				var resp = $(data);
				console.log(resp);
				$(".calendar-div").html("<span style='color: red'>Error retrieving your calendar.</span>");
			}
		});
    }
	
	function getGrades(){
		$.ajax({
			type: 'GET',
			url: 'https://lms.neumont.edu/grades',
			success: function(data){
				var response = $(data);
				var grades = response.find(".course_details");
				$(".grade-summary-div").html(grades);
			},
			error: function(data){
				var resp = $(data);
				console.log(resp);
				$(".grade-summary-div").html("<span style='color: red'>Error retrieving your grades.</span>");
			}
		});
	}
	
	removeElements(); 
	(function(){
		var checkIfAssideHasLoaded = setInterval(function() {
			if ( $('ul.events').length ) {
				removeElements();
			    addDivs();
				getCalendar();
				getGrades();
				getAssignments();

				clearInterval(checkIfAssideHasLoaded); 
			}
			console.log('magic');
		}, 50);
	}())
});

