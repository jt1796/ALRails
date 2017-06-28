var question_seconds = 5;
var question_set_size = -1;
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

var display_new_question = function(view) {
  timer.start();
  $('#current-question').html(view);
  $('.answer-button').click(function() {
    $('.answer-button').prop('disabled', true).css('opacity',0.5);
    App.lectureChannel.perform('response', {
      question_id: $(this).data('qid'),
      answer_id: $(this).data('id')
    });
  });
}

var displayNextQuestion = function() {
  if(question_index === question_set_size) {
    return;
  }
  App.lectureChannel.perform('question', {index: question_index});
  timer.start();
  question_index++;
}

var startLecture = function() {
  $('#question-release').click(function() {
    displayNextQuestion();
    $('#question-release').prop('disabled', true).css('opacity',0.5);
    setTimeout(function() {
      $('#question-release').prop('disabled', false).css('opacity',1.0);
    }, 1000*question_seconds);
  });
}

var requestSetSize = function() {
  App.lectureChannel.perform('request_set_size')
}

var requestConnectedUsers = function() {
  App.lectureChannel.perform('request_connected_users');
}

var user_enter = function(user) {
  App.lectureChannel.perform("enter", {username: user});
}

var user_leave = function(user) {
  App.lectureChannel.perform("exit", {username: user});
}

var announce_presence = function() {
  App.lectureChannel.perform('announce_presence');
}
