(function(){
	
	var score = 0;

var Question = function(question, options, answer)
{
	this.question = question;
	this.options = options;
	this.answer = answer;

}

Question.prototype.showQuestion = function(){
	return this.question;
}

Question.prototype.showOptions = function(){
	for(var i =0;i< this.options.length;i++)
	{
		console.log(this.options[i]);	
	}
}

Question.prototype.showAnswer = function(userAnswer){
	if(this.answer == userAnswer){
		console.log('Correct answer!');
		score++;
		console.log('Your current score is ', score);
		console.log('========================================');
	}
	else
	{
		console.log('Wrong answer!');
		console.log('Your current score is ', score);
		console.log('========================================');
	}
}

var question1 = new Question('Are you Ping?', ['0:Yes','1:No'],0);
var question2 = new Question('Is JavaScript the coolest language in the world?', ['0:Yes','1:No'],1);
var question3 = new Question('Which country is Toronto in?', ['0:Canada','1:USA'],0);
var question4 = new Question('What colors does the rainbow has?', ['0:Red','1:Blue','2:Green','3:Red,Blue,Green'],3);


function nextQuestion()
{	
var questions = [question1, question2, question3,question4];
var questionIndex = Math.floor(Math.random() * questions.length);
	console.log(questions[questionIndex].showQuestion());
	questions[questionIndex].showOptions();
	var userAnswer = prompt(questions[questionIndex].showQuestion());
	
	questionIndex = Math.floor(Math.random() * questions.length);
	
	if(userAnswer !== 'exit')
	{
		questions[questionIndex].showAnswer(parseInt(userAnswer));
		nextQuestion();
	}
}

nextQuestion();
	
})();

