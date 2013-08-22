Meteor.publish('allFeedbacks', function(){
  return Feedbacks.find();
});