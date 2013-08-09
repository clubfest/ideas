Template.editClub.events({
  'click #save-content': function(evt, tmpl){
    var clubName = Session.get('routedClubName');
    var clubId = clubNameToId(clubName, true);
    if (clubId==null){
      alert('Invalid club name. Please email admin.');
      return;
    } 
    var newValue = tmpl.find('#content').value;
    Clubs.update(
      {_id: clubId},
      {$set: {content: newValue}},
      function(err){
        if (err){
          alert(err);
        } else {
          Meteor.Router.to('/clubs/'+clubName);
        }
      })
  }
});
