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
      receivers = []
      _.each(Clubs.findOne(clubId).memberEmails, function(email){
        // if (receivers.indexOf(email.address) > -1){}
        receivers.push(email.address);
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
  },
  'click #gmail-btn': function(evt, tmpl){
    evt.preventDefault();
    var clubId = Session.get('routedClubId');
    var subject = tmpl.find('#email-subject').value;
    var content = tmpl.find('#email-content').value;
    var clubName = tmpl.find('#club-name-input').value;
    var adminArray = [];
    _.each(Clubs.findOne(clubId).adminEmails, function(email){
      adminArray.push(email.address);
    });
    var emailToOptions = tmpl.find('#email-to').value;
    var memberArray = [];
    if (emailToOptions=='members'){
      _.each(Clubs.findOne(clubId).memberEmails, function(email){
        memberArray.push(email.address);
      });
    }
    var gmailUrl = 'http://mail.google.com/mail/?view=cm&fs=1'+
                '&to=' + adminArray.join() +
                '&bcc=' + memberArray.join() +
                '&su=' + subject +
                '&body=' + content +
                '&ui=1';
    window.open(gmailUrl, '_blank');
  }
}

Template.sendMessage.club = function(){
  return Clubs.findOne(Session.get('routedClubId'))
}

Template.sendMessage.created = function(){
  Session.set('atClubHome', false)
}