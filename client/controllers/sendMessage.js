Template.sendMessage.events = {
  'click #send-btn': function(evt, tmpl){
    evt.preventDefault();
    var clubId = Session.get('routedClubId');
    var subject = tmpl.find('#email-subject').value;
    var content = tmpl.find('#email-content').value;
    // TODO: validate admin, subject, content
    var receivers = _.map(Clubs.findOne(clubId).memberEmails, function(email){
      return email.address;
    });
    var sender = Meteor.user().services.google.email;
    var from = sender;
    receivers.push(sender);
    console.log(sender);
    Meteor.call('sendToMailingList', from, sender, receivers, subject, content, function(err){
      if (err){
        alert(err.reason);
      } else {
        Meteor.Router.to('/clubId/'+Session.get('routedClubId'));
      }
    })
  }
}

Template.sendMessage.club = function(){
  return Clubs.findOne(Session.get('routedClubId'))
}