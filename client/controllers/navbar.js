Accounts.ui.config({
  requestPermissions: {
    facebook: ['email', 'publish_stream'],
  },
});

Template.navbar.currCategory = function() {
  var club = Clubs.findOne(Session.get('routedClubId'));
  if (club) {
    return {
      _id: club.categoryId,
      name: club.categoryName
    }
  }
}

Template.navbar.currClub = function() {
  return Clubs.findOne(Session.get('routedClubId'));
}

Template.navbar.abbrev = function(arg) {
  return arg.slice(0, 10) + '...'
}