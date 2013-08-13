
Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      _id: 1, 
      clubAdminRoles: 1,
      clubMemberRoles: 1,
      "profile.name": 1,
      "services.google.email": 1
    }
  });
});
