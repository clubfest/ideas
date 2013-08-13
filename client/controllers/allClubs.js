Template.allClubs.getClubs = function(){
  // very tolerant, may retrieve more than you want
  return Clubs.find({}).fetch().sort(caseInsensitiveSort);
}