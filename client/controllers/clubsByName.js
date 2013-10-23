Template.clubsByName.clubs = function() {
  var name = Session.get('routedClubName');
  if (!name) {
    return Clubs.find({
      removed: null
    }).fetch().sort(caseInsensitiveNameSort);
  }
  var clubs = Clubs.find({
    removed: null,
    name: {
      $regex: new RegExp(name, 'i')
    }
  })
  clubs = clubs.fetch()
  clubs.sort(caseInsensitiveNameSort);
  if (clubs.length == 1) {
    var clubId = clubs[0]._id;
    Meteor.Router.to('/clubId/' + clubId);
  } else {
    return clubs;
  }
}

Template.clubsByName.events({
  'click #search-btn': function(evt, tmpl) {
    evt.preventDefault();
    name = tmpl.find('#search-textbox').value;
    Session.set('routedClubName', name);
  }
})