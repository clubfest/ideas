TempUsers = new Meteor.Collection('TempUsers')

Meteor.methods({
  findTempUserByEmail: function(email){
    var user = TempUsers.findOne({email: {$regex: new RegExp(email, 'i')}});
    if (user) {
      return user._id;
    } else {
      return null;
    }
  },
  createTempUser: function(email){
    return TempUsers.insert({email: email});
  },
  addClubToTempMemberRoles: function(clubId, userId){
    var club = Clubs.findOne(clubId);
    TempUsers.update(userId, {
      $addToSet: {clubMemberRoles: {
        _id: club._id,
        name: club.name
      }}
    });
  },
  addClubToTempAdminRoles: function(clubId, userId){
    var club = Clubs.findOne(clubId);
    TempUsers.update(userId, {
      $addToSet: {clubAdminRoles: {
        _id: club._id,
        name: club.name
      }}
    });
  },
  syncTempUserToUser: function(userEmail, userId){
    var tempUser = TempUsers.findOne({email: {$regex: new RegExp(email, 'i')}});
    var roles = tempUser.clubMemberRoles;
    var adminRoles = tempUser.clubAdminRoles;
    Meteor.users.update(userId, {
      $addToSet: {clubMemberRoles: {$each: roles}}
    });
    Meteor.users.update(userId, {
      $addToSet: {clubAdminRoles: {$each: adminRoles}}
    }); 
    Meteor.users.remove({email: userEmail});
  }
})

