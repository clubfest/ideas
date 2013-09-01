Meteor.publish('allClubs', function(){
  return Clubs.find({}, {
    fields: {
      memberEmails: 0
    }
  });
});

Meteor.publish('yourClubs', function(){
  var userId = this.userId;
  if (userId){
    var user = Meteor.users.findOne(userId);
    var clubIds = _.map(user.clubAdminRoles, function(role){
      return role._id;
    });
    return Clubs.find({_id: {$in: clubIds}});
  }
});