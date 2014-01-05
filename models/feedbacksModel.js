Feedbacks = new Meteor.Collection('Feedbacks')

Meteor.methods({
  'addFeedback': function(content) {
    Feedbacks.insert({
      content: content,
      userId: Meteor.userId()
    });
  }
})