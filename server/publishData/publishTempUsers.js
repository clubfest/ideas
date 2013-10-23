// Meteor.publish('TempUser', function(){
//   var user = Meteor.user();
//   if (user && user.services){
//     var userEmail = user.services.google.email
//     return TempUser.findOne({email: userEmail});
//   }
// });

Meteor.publish('allTempUsers', function() {
  return TempUsers.find();
});