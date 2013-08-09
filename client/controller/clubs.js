Template.clubs.getClubs = function(){
  return Clubs.find({},{sort: {name: 1}}).fetch();
}