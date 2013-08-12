// Hooks.onCreateUser = function(userId){
//   Meteor.users.update(userId,{
//     $set: {clubAdminRoles: [], clubIds: []}});
// }



// Only for testing purposes
Meteor.methods({
  createUser: function(userInfo){
    var user = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };
    return Meteor.users.insert(user);
  }
})