//isClubAdmin in globalHelpers
Template.club.created = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (club){
    document.title = club.name;
  }
}

Template.club.events = {
  'click #join-btn': function(){
    afterSignIn(function(){     
      var email = Meteor.user().services.google.email;
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
      var email = Meteor.user().services.google.email;
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
  }
}

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