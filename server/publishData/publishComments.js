Meteor.publish('allComments', function(options) {
  if (options) {
    return Comments.find({
      clubId: options.clubId
    });
  }
})