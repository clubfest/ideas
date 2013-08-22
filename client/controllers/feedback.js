Template.feedback.feedbacks = function(){
  return Feedbacks.find();
}

Template.feedback.events({
  'click #submit-btn': function(evt, tmpl){
    afterSignIn(function(){
      Meteor.call('addFeedback',
        tmpl.find('#feedback-textarea').value,
        function(err){
          if(err){
            alert(err.reason);
          }
        }
      )
    })
  }
})