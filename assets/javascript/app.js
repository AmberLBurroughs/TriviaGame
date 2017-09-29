 /* ╮(╯▽╰)╭ */

var questionAnswers = [
	{
		question: "question A",
		answers: ["Aa", "Ab", "Ac"],
		correctAnswer: "Ab"
	},
	{
		question: "question B",
		answers: ["Ba", "Bb", "Bc"],
		correctAnswer: "Bc"
	},
	{
		question: "question C",
		answers: ["Ca", "Cb", "Cc"],
		correctAnswer: "Ca",
	},
];

var gameState ={
	correctlyAnswered: 0,
	incorrectlyAnswer: 0,
	unanswered: 0,
	totalAnswered: 0,
	
	renderCurrentQuestion: function(){ 
		var questionObject = questionAnswers[this.totalAnswered];
		//console.log("renderCurrentQuestion " + this.totalAnswered)
		var triviaHTML = gameState.createQuestionHTML(questionObject);

		$("#sec" + (this.totalAnswered+1)).removeClass("hide").append(triviaHTML);

		gameState.bindAnswerClicks();
	},
	
	createQuestionHTML: function(questionObject){
		var sectionHTML = document.createElement('div');
		sectionHTML.className = "content-container";

		var timerContainer = document.createElement('div');
		timerContainer.className = "timer-container";
		var timerText = document.createElement('p');
		timerContainer.appendChild(timerText);
		sectionHTML.appendChild(timerContainer);

		var sectionQuestion = document.createElement('h3');
		sectionQuestion.innerText = questionObject.question;
		sectionHTML.appendChild(sectionQuestion);

		var messageContainer = document.createElement('div');
		messageContainer.className = "message-container";
		sectionHTML.appendChild(messageContainer);
		//console.log(sectionHTML);
		for(var i = 0;i<questionObject.answers.length; i++){
			//console.log("answer array length: " + questionObject.answers.length);
			var sectionAnswers = document.createElement('button');
			sectionAnswers.className = "btn";
			sectionAnswers.innerText = questionObject.answers[i];
			sectionHTML.appendChild(sectionAnswers);
		}
		return sectionHTML;
	},

	bindAnswerClicks: function(){
		$(".btn").on("click", function(){
			timer.stop();
			var chosenAnswer = $(this).text();
			gameState.totalAnswered++;
			// console.log(chosenAnswer);
			// console.log(questionAnswers[2].correctAnswer);
			gameState.validateAnswer(chosenAnswer);

		});
	},

	validateAnswer: function(chosenAnswer) {
		if(chosenAnswer === questionAnswers[2].correctAnswer){
			this.correctlyAnswered++;
			this.iterateAnswered();
			var correctAnserWrap = $("<div>");
			correctAnserWrap.addClass("answer-txt");
			var correctAnserTxt = $("<h4>");
			correctAnserTxt.text("Nice! " + questionAnswers[2].correctAnswer + " is the right answer.");
			$(correctAnserWrap).append(correctAnserTxt);
			$(".message-container").append(correctAnserWrap);
			this.showNextQuestion();
			console.log("right");
			console.log("correct: " + this.correctlyAnswered);
		} else if(chosenAnswer != questionAnswers[2].correctAnswer) {
			this.incorrectlyAnswer++;
			this.iterateAnswered();
			var incorrectAnserWrap = $("<div>");
			incorrectAnserWrap.addClass("answer-txt");
			var incorrectAnserTxt = $("<h4>");
			incorrectAnserTxt.text("uh oh! " + questionAnswers[2].correctAnswer + " is the right answer.");
			$(incorrectAnserWrap).append(incorrectAnserTxt);
			$(".message-container").append(incorrectAnserWrap);
			this.showNextQuestion();
			// incorrect text
			console.log("wrong");
			console.log("incorrect: " + this.incorrectlyAnswer);
		}
	},

	showNextQuestion: function(){
		setTimeout(function(){
			$("#sec" + this.totalAnswered).addClass("hide");
			// get HTML for next question
			gameState.renderCurrentQuestion();
			// timer.startTimer();
			// render question in the intended div
			// do whatever animation/logic to show that question
			// bind all the events for the new HTML
		}, 2000);  /// not sure how long need
	},

	iterateAnswered: function() {
		totalAnswered = this.incorrectlyAnswer + this.correctlyAnswered + this.unanswered;
		console.log("total answered: " + totalAnswered);
	}

}

// timer
var timer = {
	intervalId: null,
	number: 10,
	startTimer: function(){
		if(gameState.totalAnswered === 0){
			$("#start-game").on("click", function(){
				gameState.renderCurrentQuestion();
				$("#home").addClass("hide");
				run();
			});
		}else {
			run();
		}	 
		function run() {
		  timer.intervalId = setInterval(timer.decrement, 1000);
		  $(".timer-container > p").text(timer.number);
		}
	},

	decrement: function(){
	  	timer.number--;
	  	console.log(timer.number);
	  	$(".timer-container > p").text(timer.number);
	  	if(timer.number == 0) {
	  		/*
	  		only increment unanswered if the current question has not been answered (make sure to not count this as 
	  			an unanswered question if the timer hits 0 while you're showing the correct/incorrect HTML and they've already guessed).
	  		*/ // 
	  		gameState.unanswered++;
	  		gameState.totalAnswered++;
	  		gameState.iterateAnswered();
	  		console.log("unanswered question: " + gameState.unanswered);
		    timer.stop();
		    gameState.showNextQuestion(); //runs on a timeout:
	  	}
	},

	stop: function(){
		clearInterval(timer.intervalId);
		this.number = 10;
	}
} 

$(document).ready(function(){
	timer.startTimer();
});

