Template.profile.events = {
  'click .unjoin-member-btn': function(evt){
    afterSignIn(function(){
      var email = Meteor.user().services.google.email;
      Meteor.call('removeUserEmailFromMemberEmails',
        email, evt.currentTarget.dataset.id,
        function(err, result){
          if (err){ alert(err); }
      });
      Meteor.call('removeClubFromMemberRoles',
        evt.currentTarget.dataset.id, Meteor.userId(),
        function(err, result){
          if(err) { alert(err); }
      });
    });
  },
  'click .unjoin-admin-btn': function(evt){
    afterSignIn(function(){
      var email = Meteor.user().services.google.email;
      Meteor.call('removeUserEmailFromAdminEmails',
        email, evt.currentTarget.dataset.id,
        function(err, result){
          if (err){ alert('removeEmail----', err.reason); }
      });
      Meteor.call('removeClubFromAdminRoles',
        evt.currentTarget.dataset.id, Meteor.userId(),
        function(err, result){
          if(err) { alert('removeClub----', err.reason); }
      });
    });
  }
}