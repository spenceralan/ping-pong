//backend

const isNumber = function(userInput) {
  return !!userInput.match(/^[0-9]+$/);
};

const isDivisibleBy3 = function(number) {
  return number % 3 === 0;
};

//frontend

$(function(){
  $("#pingPongForm").submit(function(event){
    event.preventDefault();
    let userNumber = $("#pingPongInput").val();
    if (isNumber(userNumber)) {
      $("#pingPongAlert").text("Congratulations! You know what a number is!");
    } else {
      $("#pingPongAlert").text("I'm sorry, it appears you do not know what a number is! Please try again in a few years.");
    }
  });
});
