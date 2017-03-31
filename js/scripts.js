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

const randomNumber = function() {
  return Math.ceil(Math.random() * 250).toString()
};

const numbersAscending = function(number) {
  let numbers = [];
  for (let i=1; i <= number; i++) {
    numbers.push(i);
  };
  return numbers;
};

const numbersDescending = function(number) {
  return numbersAscending(number).reverse();
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

const pingCounter = function(results, phrase) {
  let count = 0;
  results.forEach(function(result){
    if (result === phrase) {
      count++
    };
  });
  return count;
};

//frontend

$(function(){

  const displayResults = function(userInput, direction) {

    const userNumber = Number(userInput);
    const numbers = direction(userNumber);
    const pingPongList = pingPongTransformer(numbers);
    const numberOfPings = pingCounter(pingPongList, "PING!");
    const numberOfPongs = pingCounter(pingPongList, "PONG!");
    const numberOfPingPongs = pingCounter(pingPongList, "PINGPONG!");

    if (userNumber === 0) {
      return displayAlert(0);
    };

    if (userNumber > 250) {
      return displayAlert(userNumber);
    };

    if (direction === numbersAscending) {
      $("#pingMessage").text("You've been pinged!");
    } else {
      $("#pingMessage").text("You've been ponged!");
    };

    $("#pingPongAlert").empty();
    $("#pingPongResults").empty();
    $("#howManyPings").empty();

    displayNumberOfPings(numberOfPings, "ping");
    displayNumberOfPings(numberOfPongs, "pong");
    displayNumberOfPings(numberOfPingPongs, "pingpong");

    $("#resultsPage").show();

    pingPongList.forEach(function(result) {
      $("#pingPongResults").append(`<li>${result}</li>`);
    });


  };

  const displayAlert = function(userInput) {
    $("#resultsPage").hide();
    $("#pingPongAlert").empty();
    $("#howManyPings").empty();

    if (userInput === "") {
      $("#pingPongAlert").text("We can't ping or pong you if you don't input a number!");
    } else if (userInput === 0) {
      $("#pingPongAlert").text("Looks like you typed a zero. Guess there will be no pings or pongs for you today.");
    } else if (userInput > 250) {
      $("#pingPongAlert").text("If you are seeking that many pings or pongs I would strongly advise you seek the help of a medical professional.");
    } else {
      $("#pingPongAlert").text("I'm sorry, it appears you do not know what a positive whole number is! Please try again in a few years when you have acquired that skill.");
    } ;
  };

  const displayNumberOfPings = function(number, type) {
    if (number === 0) {
      return;
    } else if (number > 1) {
      $("#howManyPings").prepend(`<h3>You got ${number} ${type}s!</h3>`);
    } else {
      $("#howManyPings").prepend(`<h3>You got ${number} ${type}!</h3>`);
    };
  };

  $("#pingPongForm").submit(function(event){

    event.preventDefault();

    const userInput = $("#pingPongInput").val();

    if (isNumber(userInput)) {
      displayResults(userInput, numbersAscending);
    } else {
      displayAlert(userInput);
    };
  });

  $("#pongButton").click(function(event){

    event.preventDefault();

    const userInput = $("#pingPongInput").val();

    if (isNumber(userInput)) {
      displayResults(userInput, numbersDescending);
    } else {
      displayAlert(userInput);
    };
  });

  $("#randomButton").click(function(event){

    event.preventDefault();

    const userInput = randomNumber();

    if (isNumber(userInput)) {
      displayResults(userInput, numbersDescending);
    } else {
      displayAlert(userInput);
    };
  });

  $("#gitHubButton").click(function(){
    window.open("https://github.com/spenceralan/ping-pong-project-week-3", "_blank")
  });
});
