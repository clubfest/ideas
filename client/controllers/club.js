

//isClubAdmin in globalHelpers
Template.club.created = function(){
  Session.set('atClubHome', true)
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (club){
    document.title = 'Cornell - '+club.name;
  }
}

Template.club.events = {
  'click #join-btn': function(){
    afterSignIn(function(){     
      var email = Meteor.user().services.facebook.email;
      Meteor.call('addUserEmailToMemberEmails',
        email, Session.get('routedClubId'),
        function(err, result){
          if (err) {alert(err);}
      });
      Meteor.call('addClubToMemberRoles', 
        Session.get('routedClubId'), Meteor.userId(),
        function(err,result){
          if (err) { alert(err);}
      });
    });
  },
  'click #unjoin-btn': function(){
    afterSignIn(function(){
      var email = Meteor.user().services.facebook.email;
      Meteor.call('removeUserEmailFromMemberEmails',
        email, Session.get('routedClubId'),
        function(err, result){
          if (err){ alert(err); }
      });
      Meteor.call('removeClubFromMemberRoles',
        Session.get('routedClubId'), Meteor.userId(),
        function(err, result){
          if(err) { alert(err); }
      });
    });
  },
  'click #list-serv-btn': function(){
    bootbox.prompt("What is your list-serv name?", function(result) {                
      if (result !== null) {
        Meteor.call('addListServName', result, Session.get('routedClubId'));                     
      }
    });
  },
  'submit #netid-form': function(evt, tmpl){
    evt.preventDefault();
    var netId = $('#netid-input').val();
    if (netId.match(/[0-9]+$/)){
      var email = netId + '@cornell.edu';
      var club = Clubs.findOne(Session.get('routedClubId'));
      Meteor.call('addUserEmailToMemberEmails',
        email, club._id,
        function(err, result){
          if (err){ 
            alert(err.reason);
          } else {
            tmpl.find('#netid-input').value = "";
          }
      });
      Meteor.call('sendEmail', email,
        'welcome@ideas.on.meteor.com', 
        club.name + ' has added you to their mailing list',
        welcome_email,
        function(err){if (err) {alert(err.reason+'---in sendEmail');}
      });
    } else {
      alert('Net ID should end with numbers.');
    }

  }
}

var welcome_email = '\
  Check out other clubs at ideas.on.meteor.com'

Template.club.getClub = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  return {club: club};
}

Template.club.isMember = function(){
  var user = Meteor.user();
  if (!user){ return false; }
  var clubIds=_.map(user.clubMemberRoles, function(role){return role._id});
  if (clubIds.indexOf(Session.get('routedClubId'))==-1){
    return false;
  } else {
    return true;
  }
}