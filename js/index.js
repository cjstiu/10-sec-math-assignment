$(document).ready(function() {
    var currentQuestion;
    var score = 0;

    var getLimit = function () {
        var numberLimit = $('#numberlimit').val();
        return numberLimit;
    }
    
    var maxNumber = getLimit();

    $('#numberlimit').on('input', function(){
        maxNumber = $(this).val();
        console.log(maxNumber);
        $('#maxNumberDisplay').text(maxNumber);
    });

    function randomNumberGenerator(size) {
        return Math.ceil(Math.random() * size);
    }

    var questionGenerator = function() {
        var question = {};
        var num1 = randomNumberGenerator(maxNumber);
        var num2 = randomNumberGenerator(maxNumber);

        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);

        return question;
    }

    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

    var renderNewQuestion = function() {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }

    var checkAnswer = function(userAnswer, answer) {
        if(userAnswer === answer){
            renderNewQuestion();
            $('#user-answer').val('');
            updateTimeLeft(1);
            updateScore(1);
        }
    }

    $('#user-answer').on('keyup', function(){
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer)
    });

    renderNewQuestion();

    var timeLeft = 10;

    var interval; 
    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }            
            interval = setInterval(function() {
                updateTimeLeft(-1);
                $('#time-left').text(timeLeft);
                if(timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                    updateHighScore(score);
                }
            }, 1000);
        }
    }

    var updateTimeLeft = function(amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    var updateScore = function (amount) {
        score += amount;
        $('#user-score').text("Current score: " + score);
    }

    var highScore = 0;
    
    var updateHighScore = function (score) {
        if (score > highScore) {
            highScore = score;
        };
        $('#high-score').text("High score: " + highScore);
    }


});