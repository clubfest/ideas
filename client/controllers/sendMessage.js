Template.sendMessage.events = {
  'click #send-btn': function(evt, tmpl){
    evt.preventDefault();
    var clubId = Session.get('routedClubId');
    var subject = tmpl.find('#email-subject').value;
    var content = tmpl.find('#email-content').value;
    var clubName = tmpl.find('#club-name-input').value;
    clubName = clubName.replace(/\s/g, '.');
    clubName = clubName.replace(/@/g, '');
    var from = clubName + '@club.fest.on.meteor.com'
    var receivers;
    var emailToOptions = tmpl.find('#email-to').value;
    if (emailToOptions=='admins'){
      receivers = _.map(Clubs.findOne(clubId).adminEmails, function(email){
        return email.address;
      });

    } else {
      receivers = _.map(Clubs.findOne(clubId).memberEmails, function(email){
        return email.address;
      });
    }
    var sender = Meteor.user().services.google.email;
    var replyTo = sender;
    console.log(receivers);
    Meteor.call('sendToMailingList', from, sender,
      receivers, replyTo, subject, content,
      function(err){
        if (err){
          alert(err.reason);
        } else {
          alert('message sent :-)')
          Meteor.Router.to('/clubId/'+Session.get('routedClubId'));
        }
      }
    )
  }
}

Template.sendMessage.club = function(){
  return Clubs.findOne(Session.get('routedClubId'))
}