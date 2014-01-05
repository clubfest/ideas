Meteor.publish('allCategories', function() {
  return Categories.find();
});