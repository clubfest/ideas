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
    Meteor.call('sendToMailingList', 'unknown', 'unknown', receivers, subject, content, function(err){
      if (err){
        alert(err.reason);
      } else {
        alert('sent');
      }
    })
  }
}