Template.profile.created = function() {
  Session.set('profileEditMode', false);
}

Template.profile.editMode = function() {
  return Session.get('profileEditMode');
}

Template.profile.events = {
  'click #edit-toggle': function(evt) {
    Session.set('profileEditMode', !Session.get('profileEditMode'));
  },
  'click .unjoin-member-btn': function(evt) {
    afterSignIn(function() {
      var email = Meteor.user().services.facebook.email;
      Meteor.call('removeUserEmailFromMemberEmails',
        email, evt.currentTarget.dataset.id,
        function(err, result) {
          if (err) {
            alert(err);
          }
        });
      Meteor.call('removeClubFromMemberRoles',
        evt.currentTarget.dataset.id, Meteor.userId(),
        function(err, result) {
          if (err) {
            alert(err);
          }
        });
    });
  },
  'click .unjoin-admin-btn': function(evt) {
    afterSignIn(function() {
      var email = Meteor.user().services.facebook.email;
      Meteor.call('removeUserEmailFromAdminEmails',
        email, evt.currentTarget.dataset.id,
        function(err, result) {
          if (err) {
            alert(err.reason);
          }
        });
      Meteor.call('removeClubFromAdminRoles',
        evt.currentTarget.dataset.id, Meteor.userId(),
        function(err, result) {
          if (err) {
            alert(err.reason);
          }
        });
    });
  }
}