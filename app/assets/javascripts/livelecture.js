var question_seconds = 5;
var question_set = {};
var question_index = 0;
var timer;

var create_timer = function() {
  timer = $("#countdown").countdown360({
      radius: 60,
      seconds: question_seconds,
      autostart: false,
      startOverAfterAdding: true
  });
}

var display_new_question = function(q) {
  timer.start();
  $('#question-text').text(q.body);
  $('#answers').empty();
  for (var i in q.answers) {
    $('#answers').append('<li><button class="answer-button" id=' + q.answers[i].id + '>Answer</button>' + q.answers[i].answer + '</li>');
  }
  $('.answer-button').click(function() {
    $('.answer-button').prop('disabled', true).css('opacity',0.5);
    var answer_id = this.id
    App.lectureChannel.send({msg: 'response', question: q.id, answer: this.id });
  });
}

var displayNextQuestion = function() {
  if(question_index === question_set.questions.length) {
    return;
  }
  var question = question_set.questions[question_index];
  var answers = question.answers;
  App.lectureChannel.send({msg: 'question', body: question })
  timer.start();
  $('#question-text').text(question.body);
  $('#answers').empty();
  for (var i in answers) {
    $('#answers').append('<li>' + answers[i].answer + '<p id=' + answers[i].id + '>0</p></li>');
  }
  question_index++;
}

var startLecture = function() {
  displayNextQuestion();
  window.setInterval(displayNextQuestion, 1000*question_seconds);
}

var requestQuestionSet = function() {
  App.lectureChannel.send({msg: 'requestQuestionSet'});
}

var requestConnectedUsers = function() {
  App.lectureChannel.send({msg: 'requestConnectedUsers'})
}

var user_enter = function(user) {
  App.lectureChannel.perform("enter", {user: user})
}

var user_leave = function(user) {
  App.lectureChannel.perform("exit", {user: user})
}
