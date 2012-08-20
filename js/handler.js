$(function() {
	if(localStorage["canvasKey"] == ""){
		document.getElementById("MyKey").value="Canvas Key Here";
	}
	else{
		document.getElementById("MyKey").value=localStorage["canvasKey"];
	}
	$(".save").click(saveKeyEventHandler);
	$(".clear").click(removeKeyEventHandler);
});
function saveKey(){
	var key = document.getElementById("MyKey").value;
	localStorage["canvasKey"] = key;
	if(localStorage["canvasKey"] == null){
		alert("Problem storing Key");
	}
}
function removeKey(){
	localStorage["canvasKey"] = "";
	if(localStorage["canvasKey"] == ""){
		alert("Key removed");
	}
	else{
		alert("Problem removing key");
	}
}

function saveKeyEventHandler(e){
	setTimeout(saveKey, 1000);
}

function removeKeyEventHandler(e){
	setTimeout(removeKey, 1000);
}



