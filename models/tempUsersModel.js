TempUsers = new Meteor.Collection('TempUsers')

Meteor.methods({
  addClubToTempMemberRole: function(clubId, email){
    var club = Clubs.findOne(clubId);
    var user = TempUsers.findOne({email: email});
    if (user){
      TempUsers.update(user._id, {
        $addToSet: {clubMemberRoles: {
          _id: club._id,
          name: club.name
        }}
      });
    } else {
      TempUsers.insert({
        email: email,
        clubMemberRoles:[{
          _id: club._id,
          name: club.name
        }]
      })
    }
  },
  findTempUserByEmail: function(email){
    return TempUsers.findOne({email: email})
  },
  syncTempUserToUser: function(userEmail, userId){
    var tempUser = TempUsers.findOne({email: userEmail});
    var roles = tempUser.clubMemberRoles;
    console.log('---', roles);
    Meteor.users.update(userId, {
      $addToSet: {clubMemberRoles: {$each: roles}}
    }); 
    Meteor.users.remove({email: userEmail});
  }
})

