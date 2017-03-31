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

const pingPongTransformer = function(numbers) {
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

  const displayResults = function(results) {
    $("#pingPongAlert").empty();
    $("#pingPongResults").empty();
    results.forEach(function(result) {
      $("#pingPongResults").append(`<li>${result}</li>`);
    });
  };

  const displayAlert = function() {
    $("#pingPongAlert").empty();
    $("#pingPongResults").empty();
    $("#pingPongAlert").text("I'm sorry, it appears you do not know what a positive whole number is! Please try again in a few years.");
  };

  $("#pingPongForm").submit(function(event){

    event.preventDefault();

    const userInput = $("#pingPongInput").val();

    if (isNumber(userInput)) {
      const number = Number(userInput);
      const pingPongList = pingPongTransformer(numbersDescending(number));
      displayResults(pingPongList);
    } else {
      displayAlert();
    }
  });
});
