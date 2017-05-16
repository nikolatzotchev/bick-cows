var number_size = 3;
var number_toquess = [];
var user_number = 1;
var number_of_guesses = 0;
var cows = 0;
var bulls = 0;
var hints_shown = [];
var not_hinted_positions = new Array();

var red_color = "#ff5e3a";
var green_color = "#D9E76C";
var blue_color = "#6e9bef";

function updateTextInput(val) {
    $("#textInput").val(val);
	  number_size = val;
}

function random_number() {
  number_toquess = new Array();
  hints_shown = new Array();
  not_hinted_positions = new Array();
  clear_table();
  $("#hinter").html();
  populate_hint();
  $("#your_number").prop("disabled", false);

	$("#status").html("<b>Game has started!</b> You have to guess a <b>" + number_size + "</b> digits long number!");
	for (var i = 0 ; i < number_size ; i++) {
		var digit = random_digit(10);
    if (i == 0 && digit == 0) {
      i--;
    }
    while (number_toquess.includes(digit)) {
        digit = random_digit(10);
    }
      number_toquess.push(digit);
  }
  $("#choose").hide();
  console.log(number_toquess.toString());
}

function populate_hint() {
  hints_shown = new Array();
  for(var i = 0; i < number_size; i++) {
    hints_shown.push('*');
    not_hinted_positions.push(i);
  }
}

function random_digit(max_number) {
    var digit = Math.floor((Math.random() * max_number));
    return digit;
}

function clear_table() {
  for(var i = number_of_guesses; i > 0; i--) {
    var table = document.getElementById("history_table");
    table.deleteRow(i);
  }
  number_of_guesses = 0;
}

function check_number() {
  console.log(user_number.length + " and " + number_size);
  if (user_number.length != number_size) {
    $("#status").html("<b>" + "Wrong number! </b> Digit size must be <b>" + number_size + "</b> not <b>" + user_number.length + "</b>");
    $("#status").css("background", red_color);
  } else {
    updateQuessInput();
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
    if (bulls == number_size) {
      $("#status").html("<b>You won!</b> You gueesed <b>" + number_toquess + " </b> in <b>" + number_of_guesses + "</b> tries!");
      $("#status").css("background", green_color);
      alert("You won!");
      $("#choose").show();
    } else {
      $("#status").html("Your number (<b>" + user_number +"</b>) has <b>" + cows + "</b> cows and <b>" + bulls + "</b> bulls.");
      $("#status").css("background", blue_color);
    }
  }
}

function restart() {
  $("#choose").show();
  $("#status").html();
  clear_table();
}

function showNumber() {
  $("#hinter").html("<b>You gave up!</b> The number was <b>" + number_toquess + "</b>!");
  $("#hinter").css("background", red_color);
}

function hint() {
  //console.log(not_hinted_positions.toString());
  if(not_hinted_positions.length   > 0) {
    var random_number = random_digit(not_hinted_positions.length);
    var to_hint = not_hinted_positions[random_number];
    not_hinted_positions.splice(random_number, 1);
    hints_shown[to_hint] = number_toquess[to_hint];
    $("#hinter").html(hints_shown.toString());
  }
  if(not_hinted_positions.length == 0) {
      $("#your_number").prop("disabled", true);
      $("#status").html("<b>You lost!</b> You used all your hints!");
      $("#status").css("background", red_color);
  }
}

function check_bulls_and_cows() {
  cows = 0;
  bulls = 0;
  for(var i = 0; i < number_size; i++) {
    for(var in_number = 0; in_number < number_size; in_number++) {

      var user_number_at_position = user_number.toString().charAt(i);
      var random_number_at_position = number_toquess[in_number];

      if(user_number_at_position == random_number_at_position) {
        if(i == in_number) bulls++;
        else cows++;
      }
    }
  }
}

function updateQuessInput() {
  user_number = $("#your_number").val();
}
