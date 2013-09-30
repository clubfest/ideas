
function addClubToAdminRolesInsecure(clubId, userId){
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
}

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
  addClubToAdminRolesFirstTime: function(clubId, userId){
    return addClubToAdminRolesInsecure(clubId, userId);
  },
  addClubToAdminRoles: function(clubId, userId){
    checkAdmin(clubId);
    return addClubToAdminRolesInsecure(clubId, userId);
  },
  removeClubFromAdminRoles: function(clubId, userId){
    checkAdmin(clubId);
    var club = Clubs.findOne(clubId);
    if (club.adminEmails.length < 2 && !club.removed){
      throw new Meteor.Error(413, 'You are the last admin. Please remove the club first at the edit page.')
    }
    Meteor.users.update(userId, {
      $pull: {
        clubAdminRoles: {
          _id: clubId
        }
      }
    });
  },
  findUserByEmail: function(email){
    var user = Meteor.users.findOne({
      "services.facebook.email": {
        $regex: new RegExp(email, 'i')
      }
    });
    if (user){
      return user._id
    } else {
      return null;
    }
  }
});