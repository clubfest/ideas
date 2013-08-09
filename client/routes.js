Meteor.Router.add({
  '/': 'home',
  '/instruction': 'instruction',
  '/createClub': 'createClub',
  '/categories': function(){
    return 'allClubs';
  },
  '/categories/:name': function(name){
    Session.set('currCategoryName', name);
    return 'clubs';
  },
  '/clubs/:name': function(name){
    Session.set('currClubName', name)
    return 'club'
  },
  '/editClub/:name': function(name){
    Session.set('currClubName', name)
    console.log(name)
    return 'editClub'
  }
});