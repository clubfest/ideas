// Template.sync.rendered = function(){
// }
Template.sync.events({
  'click #sync-btn': function() {
    afterSignIn(function() {
      Meteor.call('syncTempUserToUser', function(err) {
        if (err) {
          alert(err.reason);
        }
      });
    });
  }
})

Template.sync.clubs = function() {
  if (Meteor.user()) {
    return Meteor.user().clubMemberRoles;
  }
};