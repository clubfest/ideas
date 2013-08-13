// Hooks.onCreateUser = function(userId){
//   Meteor.users.update(userId,{
//     $set: {clubAdminRoles: [], clubIds: []}});
// }



// Only for testing purposes
// Meteor.methods({
//   createUser: function(userInfo){
//     var user = {
//       name: userInfo.name,
//       email: userInfo.email,
//       password: userInfo.password,
//     };
//     return Meteor.users.insert(user);
//   }
// })

Meteor.methods({
  addClubToMemberRoles: function(clubId){
    var club = Clubs.findOne(clubId);
    var userId = Meteor.userId();
    Meteor.users.update(userId, {
      $addToSet: {
        clubMemberRoles: {
          _id: club._id,
          name: club.name
        }
      }
    });
  },
  removeClubFromMemberRoles: function(clubId){
    var userId = Meteor.userId();
    Meteor.users.update(userId, {
      $pull: {
        clubMemberRoles: {
          _id: clubId
        }
      }
    });
  },
  addClubToAdminRoles: function(clubId){
    var club = Clubs.findOne(clubId);
    var user = Meteor.user();
    Meteor.users.update(user, {
      $addToSet: {
        clubAdminRoles: {
          _id: club._id, 
          name: club.name
        }
      }
    });
    return clubId;
  },
  removeClubFromAdminRoles: function(clubId){
    var userId = Meteor.userId();
    var club = Clubs.findOne(clubId);
    if (club.clubAdminRoles.length < 2){
      throw Meteor.Error(413, "Your club must have at least 1 admin.");
    }
    Meteor.users.update(userId, {
      $pull: {
        clubAdminRoles: {
          _id: clubId
        }
      }
    });
  } 
});