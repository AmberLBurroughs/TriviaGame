/*
GENERAL LAYOUT:
- Initial "start quiz" button is rendered
- On click of button:
	- start quiz and show first question with answers.
	- Start timer countdown
- On correct answer click:
	- increment correct answers by one.
	- Show correct answer text.
	- Start timer that shows the next question in X seconds.
- On incorrect answer click:
	- increment incorrect answers by one.
	- Show incorrect answer text.
	- Start timer that shows the next question in X seconds.
- On timer end/no click:
	- increment unanswered by one.
	- Show incorrect (or unanswered) text.
	- Start timer that shows the next question in X seconds.
- When no more questions left:
	- Show stats.
	- Offer to play the game again.
*/

/*
The above tells us that we need several things:

- click "start quiz" button event handler that:
	- starts quiz (grabs the first question) by rendering the HTML on the page, and showing that quiz
	- renders all answers, and renders click events for handling correct/incorrect answer clicks
	- starts a timer that counts down to handle an unanswered question.
- on click of an answer:
	- check the clicked answer and compare to the current question object.
	- check if the clicked answer matches the correct answer.
	- do the correct logic for handling a correct or incorrect answer, and show the text correspondingly
	- show that text and use a setTimeout() function that will automatically show the next question in the dataset
		- or if no remaining questions, show the final score screen
- A lot of the code from the above will be reused:
	- rendering question/answer
	- counting down for handling unanswered question (unless its on the score screen)
*/