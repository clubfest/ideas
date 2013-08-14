Template.mailingList.club = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  return {
    name: club.name,
    _id: club._id,
    memberEmails: club.memberEmails.sort(caseInsensitiveSort),
    adminEmails: club.adminEmails.sort(caseInsensitiveSort)
  }
}

var welcome_email = '\
  You have been added to the mailing list of some clubs.\n\n\
  To control which mailing lists you want to be on,\n\
  visit http://club.fest.on.meteor.com/sync'

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
        if (err){ alert(err.reason+'---in addUserEmailToMemberEmails'); }
    });
    Meteor.call('findUserByEmail', email, function(err, result){
      if (err){
        alert(err.reason, '---in findUserByEmail');
      } else {
        if (result) {
          Meteor.call('addClubToMemberRoles',
            clubId, result,
            function(err,result){
              if (err) {alert(err.reason+'----in addClubToMemberRoles');}
          });
        } else {     
          Meteor.call('findTempUserByEmail', email, function(err, tempUserId){
            if (err){
              alert(err.reason+'---in findTempUserByEmail');
            } else {
              if (!tempUserId){
                Meteor.call('sendEmail', email,
                  'club.fest.on.meteor@gmail.com', 
                  'Joining Club.Fest.on.Meteor.com',
                  welcome_email,
                  function(){if (err) {alert(err.reason+'---in sendEmail');}
                });
                Meteor.call('createTempUser', email, function(err, newId){
                  if (err){
                    alert(err.reason+'---in createTempUser');
                  } else {
                    Meteor.call('addClubToTempMemberRoles', clubId, newId, function(err){
                      if (err) {alert(err.reason+'---in addClubToTempMemberRoles');}
                    });
                  }
                });
              } else {
                Meteor.call('addClubToTempMemberRoles', clubId, tempUserId,
                  function(){
                    if (err) {alert(err.reason+'---in addClubToTempMemberRoles');}
                });
              }
            }
          });       
        }
      }
    });
  },
  'click #admin-email-submit': function(evt, tmpl){
    evt.preventDefault();
    var clubId = Session.get('routedClubId')
    var email = tmpl.find('#admin-email-input').value;
    if (email.indexOf('@')==-1){
      alert("Not a valid email. You forgot @.");
      return;
    }
    Meteor.call('addUserEmailToAdminEmails',
      email, clubId,
      function(err, result){
        if (err){ alert(err.reason+'---in addUserEmailToAdminEmails'); }
    });
    Meteor.call('findUserByEmail', email, function(err, result){
      if (err){
        alert(err.reason, '---in findUserByEmail');
      } else {
        if (result) {
          Meteor.call('addClubToAdminRoles',
            clubId, result,
            function(err,result){
              if (err) {alert(err.reason+'----in addClubToAdminRoles');}
          });
        } else {     
          Meteor.call('findTempUserByEmail', email, function(err, tempUserId){
            if (err){
              alert(err.reason+'---in findTempUserByEmail');
            } else {
              if (!tempUserId){
                Meteor.call('sendEmail', email,
                  'club.fest.on.meteor@gmail.com', 
                  'Joining Club.Fest.on.Meteor.com',
                  welcome_email,
                  function(){if (err) {alert(err.reason+'---in sendEmail');}
                });
                Meteor.call('createTempUser', email, function(err, newId){
                  if (err){
                    alert(err.reason+'---in createTempUser');
                  } else {
                    Meteor.call('addClubToTempAdminRoles', clubId, newId, function(err){
                      if (err) {alert(err.reason+'---in addClubToTempAdminRoles');}
                    });
                  }
                });
              } else {
                Meteor.call('addClubToTempAdminRoles', clubId, tempUserId,
                  function(){
                    if (err) {alert(err.reason+'---in addClubToTempAdminRoles');}
                });
              }
            }
          });       
        }
      }
    });
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
