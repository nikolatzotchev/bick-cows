var number_size = 3;
var number_toquess = [];
var user_number = 1;
function updateTextInput(val) {
    $("#textInput").val(val);
	number_size = val;
}

function random_number() {
	$("#status").html("<b>" + "Game has started with a " + number_size + " digit number" + "</b>");
	for (var i = 0 ; i < number_size ; i++) {
		var digit = random_digit();
    while (number_toquess.includes(digit)) {
        digit = random_digit();
    }
      number_toquess[i] = digit;
  }
  console.log(number_toquess.toString());
}

function random_digit() {
    var digit = Math.floor((Math.random() * 10));
    return digit;
}

function check_number() {
  console.log(user_number.toString().lenght);
  if (user_number.toString().lenght != number_size) {
    $("#status").html("<b>" + "Wrong size of number!! Digit size must be " + number_size + " not " + user_number.toString().lenght + "</b>");
  }
}

function updateQuessInput() {
  console.log($("#your_number").val());
  user_number = $("#your_number").val();
}
