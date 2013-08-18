Template.mailingList.created = function(){
  Session.set('removeStyle', 'display: none;');
  Session.set('sortByDate', true);
}

Template.mailingList.club = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (Session.get('sortByDate')){
    return {
      name: club.name,
      _id: club._id,
      memberEmails: club.memberEmails.sort(createdOnReverseSort),
      adminEmails: club.adminEmails.sort(createdOnReverseSort)
    }
  } else {
    return {
      name: club.name,
      _id: club._id,
      memberEmails: club.memberEmails.sort(addressCaseInsensitiveSort),
      adminEmails: club.adminEmails.sort(addressCaseInsensitiveSort)
    }
  }
}

var createdOnReverseSort = function(a,b){
  return a.createdOn < b.createdOn;
}

var addressCaseInsensitiveSort = function(a,b){
  if (a.address.toLowerCase() < b.address.toLowerCase()) return -1;
  if (a.address.toLowerCase() > b.address.toLowerCase()) return 1;
  return 0;
}

Template.mailingList.removeStyle = function(){
  return Session.get("removeStyle");
}


var welcome_email = '\
  You have been added to some mailing lists in Club.Fest.on.Meteor\n\n\
  If you are a first time user,\n\
  visit http://club.fest.on.meteor.com/sync'

Template.mailingList.showAdmin = function(){
  return true;
}

Template.mailingList.events = {
  'click #remove-style-toggle': function(){
    if (Session.get('removeStyle')=='display: none;'){
      Session.set('removeStyle', '');
    } else {
      Session.set('removeStyle', 'display: none;');
    }
  },
  'click #sort-toggle': function(){
    Session.set('sortByDate', !Session.get('sortByDate'));
  },
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
