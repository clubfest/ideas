this.isClubAdmin = function(clubId) {
  var user = Meteor.user();
  if (!user) return false;
  var adminRoles = user.clubAdminRoles;
  if (adminRoles) {
    for (var i = 0; i < adminRoles.length; i++) {
      if (adminRoles[i]._id === clubId) {
        return true;
      }
    }
  } else {
    return false;
  }
}