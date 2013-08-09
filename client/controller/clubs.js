Template.clubs.getClubs = function(){
  var categoryName = Session.get('currCategoryName');
  // very tolerant, may retrieve more than you want
  return Clubs.find({category: categoryName},{sort: {name: 1}}).fetch();
}