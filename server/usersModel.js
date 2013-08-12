
Meteor.methods({
  addClubToAdminRoles: function(clubId){
    var club = Clubs.findOne(clubId);
    var user = Meteor.user();
    if (!user.clubAdminRoles){
      Meteor.users.update(user, {
        $set: {clubAdminRoles: []}
      });
    }
    
    Meteor.users.update(user, {
      $addToSet: {
        clubAdminRoles: {
          _id: club._id, 
          name: club.name
        }
      }
    });
  }
});