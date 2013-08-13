Meteor.methods({
  // addUserEmailToMemberEmails: function(clubId){
  //   var userEmail = Meteor.user().services.google.email;
  //   check(userEmail, String);
  //   Clubs.update(clubId, {
  //     $addToSet: {memberEmails: userEmail}
  //   });
  // },
  // addClubToMemberRoles: function(clubId){
  //   var club = Clubs.findOne(clubId);
  //   var user = Meteor.user();
  //   Meteor.users.update(user, {
  //     $addToSet: {
  //       clubMemberRoles: {
  //         _id: club._id,
  //         name: club.name
  //       }
  //     }
  //   });
  //   console.log(Meteor.user());
  // }
});