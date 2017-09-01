$(document).ready(function() {

$(".errorClear").click(function() {
	if ($("#bottomRow").hasClass("error")) {
		$("#bottomRow").html("");
		$("#bottomRow").removeClass("error");
	}
});
$(".solvedClear").click(function() {
	if ($("#bottomRow").hasClass("solved")) {
		$("#bottomRow").html("");
		$("#bottomRow").removeClass("solved");
		$("#topNumber").html("");
	}
});
//number entry
$(".number").click(function() {
	$("#bottomRow").removeClass("notEntered");
	$("#bottomRow").addClass("entered");
	if ($("#bottomRow").html() == "0") {
		$("#bottomRow").html("");
	}
	$("#bottomRow").append(this.value);
});
 //zero entry
$("#zero").click(function() {
  //allow one zero to be entered and then change the class of the bottomRow to ensure multiple zeroes aren't input without either a decimal, or after other integers
	if ($("#bottomRow").hasClass("notEntered")) {
		$("#bottomRow").append(this.value);
		$("#bottomRow").removeClass("notEntered");
		$("#bottomRow").addClass("entered");
	}
  //check to see if other digits have been entered to allow further zeroes to be input
	if ($("#bottomRow").hasClass("entered") && $("#bottomRow").html() !== "0") {
		$("#bottomRow").append(this.value); 
	}
});
  
  //decimal point entry
$("#period").click(function() {
  //if no user input before inputting the decimal, prefix the decimal with 0
	if ($("#period").hasClass("notEntered")) {  
		if ($("#bottomRow").hasClass("notEntered")) {   
			$("#bottomRow").append("0" + this.value);
		} else {
      //input solely a decimal point if other numbers have been entered
			$("#bottomRow").append(this.value);
		}
    //change classes to ensure only one decimal point can be entered for each number entered
		$("#bottomRow").addClass("entered");
		$("#bottomRow").removeClass("notEntered");
		$("#period").removeClass("notEntered");
		$("#period").addClass("entered");
	}
});
  
  //operator functions
  
$(".operation").click(function() {
  //convert string number inputs from bott rows to numbers.
	var bottomAsNum = Number($("#bottomRow").html());
	var topAsNum = Number($("#topNumber").html());
	var topOp = $("#operationHold").html();
  //enter the user inputted number into the top row and append the operator if no number has previously been entered
  
	if ($("#topNumber").hasClass("notEntered") && $("#bottomRow").hasClass("entered") && !$("#bottomRow").hasClass("solved")) {
		$("#topNumber").append(bottomAsNum);
	}
  
  //if a number (and operator) already appear in the top row, then perform the required calculation and display this in the top row (continous calculation). Calculations below will be rounded down toi three decimal places maximum if decimals appear in the answer.
	if ($("#topNumber").hasClass("entered") && $("#bottomRow").hasClass("entered")) {
		if ((topOp) == "x") {
			$("#topNumber").html(Math.round((topAsNum * bottomAsNum) * 1000) / 1000);
		}
		if ((topOp) == "÷") {
			$("#topNumber").html(Math.round((topAsNum / bottomAsNum) * 1000) / 1000);
		}
		if ((topOp) == "+") {
			$("#topNumber").html(Math.round((topAsNum + bottomAsNum) * 1000) / 1000);
		}
		if ((topOp) == "-") {
			$("#topNumber").html(Math.round((topAsNum - bottomAsNum) * 1000) / 1000);
		}
		$("#operationHold").html("");
		$("#displayLeft").html("");
	}
  
  //allow continuing calculations after the user has pressed equals, putting the answer (and new operator) into the top, working row
  
	if ($("#bottomRow").hasClass("entered") || $("#bottomRow").hasClass("solved")) {
    //display operator on the left of the screen when
		$("#operationHold").append(this.value);
		$("#displayLeft").append(this.value);
		$("#topNumber").addClass("entered");
		$("#topNumber").removeClass("notEntered");
		$("#bottomRow").addClass("notEntered");
		$("#bottomRow").removeClass("entered");
		$("#period").addClass("notEntered");
		$("#period").removeClass("entered");
	}
  //remove solved class from bottomrow and move answer to top row to allow user to continue calculations
	if ($("#bottomRow").hasClass("solved")) {
		$("#topNumber").html(bottomAsNum);
		$("#bottomRow").removeClass("solved");
	}
  //reset html of bottom (user input) row
	$("#bottomRow").html("");
});
  
  //equals functions
  
$("#equals").click(function() {
  //if user has inputted a number and operator and then presses equals before entering a second part of the equation, display the originally inputted number as the answer
	if ($("#topNumber").hasClass("entered") && ($("#bottomRow").hasClass("notEntered"))) {
		$("#bottomRow").html($("#topNumber").html());
		$("#topNumber").html("");
	}
  
  //when the user presses equals after submitting a valid calculation, calculate the answer and display in the bottom row. Also displays the last two numbers and operator in the top row, includes the same rounding calculation as in previous calculations  
	if ($("#topNumber").hasClass("entered") && ($("#bottomRow").hasClass("entered"))) {
		var bottomAsNum2 = Number($("#bottomRow").html());
		var topAsNum2 = Number($("#topNumber").html());
		var topOp2 = $("#operationHold").html();
		if ((topOp2) == "x") {
			$("#bottomRow").html(Math.round((topAsNum2 * bottomAsNum2) * 1000) / 1000);
		}
		if ((topOp2) == "÷") {
			$("#bottomRow").html(Math.round((topAsNum2 / bottomAsNum2) * 1000) / 1000);
		}
		if ((topOp2) == "+") {
			$("#bottomRow").html(Math.round((topAsNum2 + bottomAsNum2) * 1000) / 1000);
		}
		if ((topOp2) == "-") {
			$("#bottomRow").html(Math.round((topAsNum2 - bottomAsNum2) * 1000) / 1000);
		}
		$("#topNumber").html(topAsNum2 + topOp2 + bottomAsNum2 + "=");
	}
  //reset classes and html after submitting an answer to allow a user to start a new calculation without having to clear entry or clear all
	if ($("#topNumber").hasClass("entered")) {
		$("#operationHold").html("");
		$("#displayLeft").html("");
		$("#topNumber").addClass("notEntered");
		$("#topNumber").removeClass("entered");
		$("#period").addClass("notEntered");
		$("#period").removeClass("entered");
		$("#bottomRow").addClass("notEntered");
		$("#bottomRow").removeClass("entered");
		$("#bottomRow").addClass("solved");
	}
  //change default return of Infinity to Undefined if a number is divided by zero
  if ($("#bottomRow").html()=="Infinity"){
    $("#bottomRow").html("Undefined");
  }
});
  //clear bottomRow entry and reset classes
$(".clearEntry").click(function() {
	$("#bottomRow").html("");
	$("#bottomRow").addClass("notEntered");
	$("#bottomRow").removeClass("entered");
	$("#period").addClass("notEntered");
	$("#period").removeClass("entered");
	$("#bottomRow").removeClass("error");
});
  //clear all entries and reset classes
$(".allClear").click(function() {
	$("#topNumber").html("");
	$("#operationHold").html("");
	$("#displayLeft").html("");
	$("#topNumber").addClass("notEntered");
	$("#topNumber").removeClass("entered");
});
  
  //check on all button clicks whether screen display limit has been exceeded. If so display an error and add and error class to prevent appending the error message string. Resets other classes
  
$("button").click(function() {
	if ($("#bottomRow").html().length > 13 || $("#topNumber").html().length > 13) {
		$("#topNumber").html("");
		$("#operationHold").html("");
		$("#displayLeft").html("");
		$("#topNumber").addClass("notEntered");
		$("#topNumber").removeClass("entered");
		$("#bottomRow").html("DIGIT_LIMIT");
		$("#bottomRow").addClass("error");
		$("#bottomRow").addClass("notEntered");
		$("#bottomRow").removeClass("entered");
	}
});
});