//isClubAdmin in globalHelpers

Template.club.events = {
  'click #join-btn': function(){
    alert('Implement this');
  },
  'click #edit-btn': function(evt){
    evt.preventDefault();
  }
}

Template.club.getClub = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  return {club: club};
}
