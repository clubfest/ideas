Template.editClub.getClub = function(){
  return Clubs.findOne(Session.get('routedClubId'));
}
Template.editClub.events({
  'click #save-content': function(evt, tmpl){
    var clubId = Session.get('routedClubId');
    var content = tmpl.find('#content').value;
    Meteor.call('updateClubContent',
      clubId, content,
      function(err){
        if (err){
          alert(err.reason);
        } else {
          Meteor.Router.to('/clubId/'+clubId);
        }
      }
    );
  }
});
