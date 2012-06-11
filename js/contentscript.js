$(document).ready(function() {
	
    function init() {
		$("#right-side").prepend('<div class="events_list"><h2>Grade Summary</h2><div id="grade-summary-div"></div></div>');
		$("#grade-summary-div").load("grades .course_details");
    }
    init();
});
