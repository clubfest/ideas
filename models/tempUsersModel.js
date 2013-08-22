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
  syncTempUserToUser: function(){
    var user = Meteor.user();
    var email = user.services.google.email;
    var tempUser = TempUsers.findOne({"email": {$regex: new RegExp(email, 'i')}});
    if (!tempUser){
      throw new Meteor.Error(413, 'You do not have any to sync');
    }
    var roles = tempUser.clubMemberRoles;
    var adminRoles = tempUser.clubAdminRoles;
    Meteor.users.update(user._id, {
      $addToSet: {clubMemberRoles: {$each: roles}}
    });
    Meteor.users.update(user._id, {
      $addToSet: {clubAdminRoles: {$each: adminRoles}}
    }); 
    TempUsers.remove({email: email});
  }
})

