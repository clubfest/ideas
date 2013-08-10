Meteor.publish('allClubs', function(){
  return Clubs.find();
});

Meteor.publish('allCategories', function(){
  return Categories.find();
});