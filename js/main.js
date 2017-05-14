var number_size = 3;
var number;
function updateTextInput(val) {
    $("#textInput").val(val); 	
	number_size = val;
}

function random_number() {
	$("#status").html("<b>" + "Game has started with a " + number_size + " digit number" + "</b>");
	for (var i = 0 ; i < number_size ; i++) {
		var digit = Math.floor((Math.random() * 9) + 1) ;
		console.log(digit);
	}
}

