Template.mailingList.club = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  return {
    name: club.name,
    _id: club._id,
    memberEmails: club.memberEmails.sort(caseInsensitiveSort),
    adminEmails: club.adminEmails.sort(caseInsensitiveSort)
  }
}


Template.mailingList.showAdmin = function(){
  return true;
}

Template.mailingList.events = {
  'click #member-email-submit': function(evt, tmpl){
    evt.preventDefault();
    var clubId = Session.get('routedClubId')
    var email = tmpl.find('#member-email-input').value;
    if (email.indexOf('@')==-1){
      alert("Not a valid email. You forgot @.");
      return;
    }
    Meteor.call('addUserEmailToMemberEmails',
      email, clubId,
      function(err, result){
        if (err){ alert(err.reason); }
    });
    Meteor.call('findUserByEmail', email,
      function(err, result){
        if (err){
          alert(err.reason);
        } else {
          if (!result){
            // Meteor.call('addClubToTempUserMemberRole', 
            //   clubId, email);
            // // if new temp user
            // Meteor.call('sendEmailToTempUser', email)
            // alert('To be implemented: send email will be sent for you to join.');
            Meteor.call('sendEmail', email, 'club.fest.on.meteor@gmail.com', 'Joining Club.Fest.on.Meteor.com',
              'You have been added to the mailing list of some clubs.\n\n\
              To control more seamlessly which mailing lists you are on,\n\
              sign in with your current email at http://club.fest.on.meteor.com/\n\
              and go to the profile page.')
          } else {
            Meteor.call('addClubToMemberRoles',
              clubId, result,
              function(err,result){
                if (err) {alert(err.reason);}
            });
          }
        }
    });
  },
  'click #admin-email-submit': function(evt, tmpl){
    alert('to be implemented.')
  },
  'click .remove-btn': function(evt, tmpl){
    var email = evt.currentTarget.dataset.email;
    var shouldRemove = confirm('Are you sure you want to get rid of '+email);
    if (shouldRemove){
      Meteor.call('removeUserEmailFromMemberEmails',
        email, Session.get('routedClubId'),
        function(err, result){
          if (err){alert(err.reason);}
      });
      // Should we remove the role of the user as well?
    }
  }
}
