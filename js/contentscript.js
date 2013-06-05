$(document).ready(function() {

	$.ajaxSetup({
		cache: true
	});

	function removeElements(){
		$("aside#right-side").children('div').remove();
		$("aside#right-side").children('h2').remove();
		$("aside#right-side").children('ul').remove();
	}

	function addDivs(){
		$("aside#right-side").prepend('<div class="assignments"><h2><a style="float: right; font-size: 10px; font-weight: normal;" class="event-list-view-calendar small-calendar" href="https://lms.neumont.edu/calendar">View Calendar</a>Upcoming Assignments</h2><div class="assignment-summary-div"><img id="assignload" style="display: block; margin-left: auto; margin-right: auto" src="images/ajax-reload-animated.gif"></img></div></div>');
		$("aside#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div class="grade-summary-div"><img id="gradeload" style="display: block;margin-left: auto; margin-right: auto" src="images/ajax-reload-animated.gif"></img></div></div>');
		$("aside#right-side").prepend('<div class="calendar"><h2>Calendar</h2><div class="calendar-div"><img id="calload" style="display: block; margin-left: auto; margin-right: auto" src="images/ajax-reload-animated.gif"></img></div></div>');
	}

    function getAssignments() {
    	$('#assignload').show();
		$.ajax({
			type: 'GET',
			url: '/assignments',
			success: function(data){
				var response = $(data);
				var upcoming = response.find("div.events_list");

				upcoming.children("h2").remove();
				upcoming.find("div.show-only-from").remove();

				$(".assignment-summary-div").html(upcoming).hide();
			},
			error: function(data){
				var resp = $(data);
				$(".assignment-summary-div").html("<span style='color: red'>Error retrieving your assignments.</span>");
			},
			complete: function(){
				$('.assignment-summary-div').fadeIn(500);
			}
		});

    }

	function getCalendar() {
		$('#calload').show();
		$.ajax({
			type: 'GET',
			url: '/calendar',
			success: function(data){
				var response = $(data);
				var cal = response.find(".mini_month");
				cal.find("img").css('display','none');
				$(".calendar-div").html(cal).hide();
			},
			error: function(data){
				var resp = $(data);
				console.log(resp);
				$(".calendar-div").html("<span style='color: red'>Error retrieving your calendar.</span>");
			},
			complete: function(){
				$(".calendar-div").fadeIn(500);
			}
		});
    }

	function getGrades(){
		$('gradeload').show();
		$.ajax({
			type: 'GET',
			url: '/grades',
			success: function(data){
				var response = $(data);
				var grades = response.find(".course_details");
				$(".grade-summary-div").html(grades).hide();
			},
			error: function(data){
				var resp = $(data);
				console.log(resp);
				$(".grade-summary-div").html("<span style='color: red'>Error retrieving your grades.</span>");
			},
			complete: function(){
				$('.grade-summary-div').fadeIn(500);
			}
		});
	}

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
		}, 50);
	}())
});