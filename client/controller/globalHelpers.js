Handlebars.registerHelper('currClub', function(){
  var clubName = Session.get('currClubName');
  var club = Clubs.findOne({name: {$regex: clubName, $options: 'i'}});
  if (club){
    return club;
  } else {
    return {name: "The club you are searching for is not available."}
  }
});