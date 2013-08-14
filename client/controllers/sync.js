
Template.sync.created = function(){
  afterSignIn(function(){
    var user =  Meteor.user();
    var email = user.services.google.email;
    Meteor.call('syncTempUserToUser',
      email, user._id,
      function(err, result){
        if (err){ alert(err.reason); }
    });
  });
};

Template.sync.clubs = function(){
  if (Meteor.user()){
    return Meteor.user().clubMemberRoles;    
  }
};