Meteor.publish('allClubs', function(){
  return Clubs.find();
});