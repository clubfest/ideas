Template.mailingList.created = function(){
  Session.set('atClubHome', false)
  Session.set('removeStyle', 'display: none;');
  Session.set('sortByDate', true);
}

Template.mailingList.sortByWhat = function(){
  if (Session.get('sortByDate')){
    return 'alphabet'
  } else {
    return 'date'
  }
}

Template.mailingList.club = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (Session.get('sortByDate')){
    return {
      name: club.name,
      _id: club._id,
      memberEmails: club.memberEmails.reverse(),
      adminEmails: club.adminEmails.reverse()
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
  You have been added to some mailing lists in club.fest.on.meteor.com\n\n\
  If you are a first time user, visit http://club.fest.on.meteor.com/sync'

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
      alert("Yor email need an @");
      return;
    }
    Meteor.call('addUserEmailToMemberEmails',
      email, clubId,
      function(err, result){
        if (err){ 
          alert(err.reason);
        } else {
          tmpl.find('#member-email-input').value = "";
        }
    });
    Meteor.call('findUserByEmail', email, function(err, result){
      if (err){
        alert(err.reason);
      } else {
        if (result) {
          Meteor.call('addClubToMemberRoles',
            clubId, result,
            function(err,result){
              if (err) {alert(err.reason);}
          });
        } else {     
          Meteor.call('findTempUserByEmail', email, function(err, tempUserId){
            if (err){
              alert(err.reason);
            } else {
              if (!tempUserId){
                Meteor.call('sendEmail', email,
                  'welcome@club.fest.on.meteor.com', 
                  'Joining Club.Fest.on.Meteor.com',
                  welcome_email,
                  function(err){if (err) {alert(err.reason+'---in sendEmail');}
                });
                Meteor.call('createTempUser', email, function(err, newId){
                  if (err){
                    alert(err.reason);
                  } else {
                    Meteor.call('addClubToTempMemberRoles', clubId, newId, function(err){
                      if (err) {alert(err.reason);}
                    });
                  }
                });
              } else {
                Meteor.call('addClubToTempMemberRoles', clubId, tempUserId,
                  function(){
                    if (err) {alert(err.reason);}
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
      alert("Yor email need an @");
      return;
    }
    Meteor.call('addUserEmailToAdminEmails',
      email, clubId,
      function(err, result){
        if (err){ 
          alert(err.reason);
        } else {
          tmpl.find('#admin-email-input').value = "";
        }
    });
    Meteor.call('findUserByEmail', email, function(err, result){
      if (err){
        alert(err.reason);
      } else {
        if (result) {
          Meteor.call('addClubToAdminRoles',
            clubId, result,
            function(err,result){
              if (err) {alert(err.reason);}
          });
        } else {     
          Meteor.call('findTempUserByEmail', email, function(err, tempUserId){
            if (err){
              alert(err.reason);
            } else {
              if (!tempUserId){
                Meteor.call('sendEmail', email,
                  'welcome@club.fest.on.meteor.com', 
                  'Joining Club.Fest.on.Meteor.com',
                  welcome_email,
                  function(){if (err) {alert(err.reason+'---in sendEmail');}
                });
                Meteor.call('createTempUser', email, function(err, newId){
                  if (err){
                    alert(err.reason);
                  } else {
                    Meteor.call('addClubToTempAdminRoles', clubId, newId, function(err){
                      if (err) {alert(err.reason);}
                    });
                  }
                });
              } else {
                Meteor.call('addClubToTempAdminRoles', clubId, tempUserId,
                  function(){
                    if (err) {alert(err.reason);}
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
    var shouldRemove = confirm('I am about to get rid of '+email);
    var clubName = tmpl.find('#club-name').textContent;
    var subject = clubName + ' removed you from their mailing list'
    var message = clubName + ' has removed you from their mailing list.\
    \nBut the club is still in your profile page just in case you want to rejoin.\
    \nIf you want to remove it from your profile page, click edit at the bottom right of the profile page.'
    clubName = clubName.replace(/\s/g, '.');
    clubName = clubName.replace(/@/g, '');
    if (shouldRemove){
      Meteor.call('removeUserEmailFromMemberEmails',
        email, Session.get('routedClubId'),
        function(err, result){
          if (err){
            alert(err.reason);
          }
        }
      );
      Meteor.call('sendEmail', email, clubName+'@club.fest.on.meteor.com', subject, message,
        function(err){
          if (err) {
            alert(err.reason);
          } else {
            console.log("email is sent.");
          }
        }
      );
    }
  }
}
