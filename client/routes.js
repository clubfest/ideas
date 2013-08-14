Meteor.Router.add({
  '/': 'home',
  '/instruction': 'instruction',
  '/createClub': 'createClub',
  '/categoryId/:id': function(id){
    Session.set('routedCategoryId', id);
    return 'category';
  },
  '/allClubs': function(){
    return 'allClubs';
  },
  '/clubId/:id': function(id){
    Session.set('routedClubId', id);
    return 'club'
  },
  '/edit/clubId/:id': function(id){
    Session.set('routedClubId', id);
    return 'editClub';
  },
  '/profile': function(){
    return 'profile'
  },
  '/mailingList/:id': function(id){
    Session.set('routedClubId', id);
    return 'mailingList';
  },
  //   '/editClub/:name': function(name){
  //   Session.set('routedClubName', name)
  //   return 'editClub';
  // },
  // '/categories': function(){
  //   return 'home';
  // },
  // '/categories/:name': function(name){
  //   Session.set('routedCategoryName', name);
  //   return 'clubs';
  // },
  // '/clubs/:name': function(name){
  //   Session.set('routedClubName', name)
  //   return 'club';
  // },
  '/:error': function(){
    return 'errorPage';
  }
});