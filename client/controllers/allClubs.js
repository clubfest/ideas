Template.allClubs.getClubs = function() {
  // very tolerant, may retrieve more than you want
  return Clubs.find({
    removed: null
  }).fetch().sort(caseInsensitiveNameSort);
}