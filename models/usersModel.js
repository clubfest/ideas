
Meteor.methods({
  addClubToMemberRoles: function(clubId, userId){
    var club = Clubs.findOne(clubId);
    Meteor.users.update(userId, {
      $addToSet: {
        clubMemberRoles: {
          _id: club._id,
          name: club.name
        }
      }
    });
  },
  removeClubFromMemberRoles: function(clubId, userId){
    Meteor.users.update(userId, {
      $pull: {
        clubMemberRoles: {
          _id: clubId
        }
      }
    });
  },
  addClubToAdminRoles: function(clubId, userId){
    var club = Clubs.findOne(clubId);
    Meteor.users.update(userId, {
      $addToSet: {
        clubAdminRoles: {
          _id: club._id, 
          name: club.name
        }
      }
    });
    return clubId;
  },
  removeClubFromAdminRoles: function(clubId, userId){
    var club = Clubs.findOne(clubId);
    if (user.clubAdminRoles.length < 2){
      throw Meteor.Error(413, "Your club must have at least 1 admin.");
    }
    Meteor.users.update(user, {
      $pull: {
        clubAdminRoles: {
          _id: clubId
        }
      }
    });
  },
  findUserByEmail: function(email){
    var user = Meteor.users.findOne({
      "services.google.email": {
        $regex: new RegExp(email, 'i')
      }
    });
    if (user){
      return user._id
    } else {
      return null;
    }
  },
  // isClubAdmin: function(clubId){
  //   var adminRoles = Meteor.user().clubAdminRoles;
  //   if (adminRoles){
  //     for (var i=0; i<adminRoles.length; i++){
  //       if (adminRoles[i]._id===clubId) {
  //         return true;
  //       } 
  //     }
  //   } else {
  //     return false;
  //   }
  // }
});