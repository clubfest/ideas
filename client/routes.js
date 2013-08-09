Meteor.Router.add({
  '/': 'home',
  '/instruction': 'instruction',
  '/createClub': 'createClub',
  '/categories': function(){
    return 'allClubs';
  },
  '/categories/:name': function(name){
    Session.set('routedCategoryName', name);
    return 'clubs';
  },
  '/clubs/:name': function(name){
    Session.set('routedClubName', name)
    return 'club';
  },
  '/editClub/:name': function(name){
    Session.set('routedClubName', name)
    return 'editClub';
  }
});