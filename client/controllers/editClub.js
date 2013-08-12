Template.editClub.events({
  'click #save-content': function(evt, tmpl){
    var club = Clubs.findOne({
      name: Session.get('routedClubName')});
    if (!club){
      alert("We can't find a club with your name. Please email the admin.");
    } else {
      var content = tmpl.find('#content').value;

      Meteor.call('updateClubContent', club, content,
        function(err){
          if (err){
            alert(err.reason);
          } else {
            Meteor.Router.to('/clubs/'+clubName);
          }
        }
      );
    }
  }
});
