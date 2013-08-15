
Template.navbar.currCategory = function(){
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (club){
    return {_id: club.categoryId, name: club.categoryName}
  }
}
