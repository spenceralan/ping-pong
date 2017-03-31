//backend

const isNumber = function(userInput) {
  return !!userInput.match(/^[0-9]+$/);
};

const isDivisibleBy3 = function(number) {
  return number % 3 === 0;
};

const isDivisibleBy5 = function(number) {
  return number % 5 === 0;
};

const isDivisibleBy15 = function(number) {
  return number % 15 === 0;
};

const numbersDescending = function(number) {
  let numbers = [];
  for (let i=number; i > 0; i--) {
    numbers.push(i);
  };
  return numbers;
};

const pingPongTransformer = function(number) {
  const numbers = numbersDescending(number);

  return numbers.map(function(number) {
    if (isDivisibleBy15(number)) {
      return "PINGPONG!";
    } else if (isDivisibleBy5(number)) {
      return "PONG!";
    } else if (isDivisibleBy3(number)) {
      return "PING!";
    } else {
      return number;
    };
  });
};

//frontend

$(function(){

  const displayResults = function(userInput) {
    const userNumber = Number(userInput);
    const pingPongList = pingPongTransformer(userNumber);

    if (userNumber === 0) {
      return displayAlert("0");
    };

    $("#pingPongAlert").empty();
    $("#pingPongResults").empty();

    pingPongList.forEach(function(result) {
      $("#pingPongResults").append(`<li>${result}</li>`);
    });

    $("#resultsPage").show();
  };

  const displayAlert = function(userInput) {
    $("#resultsPage").hide();
    $("#pingPongAlert").empty();

    if (userInput === "") {
      $("#pingPongAlert").text("We cant pong you if you don't input a number!");
    } else if (Number(userInput) === 0) {
      $("#pingPongAlert").text("Looks like you typed a zero. Guess there will be no pongs for you today.");
    } else {
      $("#pingPongAlert").text("I'm sorry, it appears you do not know what a positive whole number is! Please try again in a few years.");
    } ;
  };

  $("#pingPongForm").submit(function(event){

    event.preventDefault();

    const userInput = $("#pingPongInput").val();

    if (isNumber(userInput)) {
      displayResults(userInput);
    } else {
      displayAlert(userInput);
    };
  });

});
