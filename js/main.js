var number_size = 3;
var number_toquess = [];
var user_number = 1;
var number_of_guesses = 0;
var cows = 0;
var bulls = 0;

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
  updateQuessInput();
  console.log(user_number.length + " and " + number_size);
  if (user_number.length != number_size) {
    $("#status").html("<b>" + "Wrong size of number!! Digit size must be " + number_size + " not " + user_number.length + "</b>");
  } else {
    number_of_guesses++;
    var table = document.getElementById("history_table");
    var row = table.insertRow(number_of_guesses);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    check_bulls_and_cows();

    cell1.innerHTML = number_of_guesses;
    cell2.innerHTML = user_number;
    cell3.innerHTML = cows;
    cell4.innerHTML = bulls;

    $("#your_number").val("");
    $("#status").html("correct!");

  }
}

function check_bulls_and_cows() {
  cows = 0;
  bulls = 0;
  for(var i = 0; i < number_size; i++) {
    for(var in_number = 0; in_number < number_size; in_number++) {
      if(user_number.toString().charAt(i) == number_toquess[in_number]) {
        if(i == in_number) bulls++;
        else cows++;
      }
    }
  }
}

function updateQuessInput() {
  console.log($("#your_number").val());
  user_number = $("#your_number").val();
}
