Template.all_clubs.getClubs = function(){
  // very tolerant, may retrieve more than you want
  return Clubs.find({},{sort: {name: 1}}).fetch();
}