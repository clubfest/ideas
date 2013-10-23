Meteor.Router.add({
  '/': 'home',
  '/instruction': 'instruction',
  '/createClub': 'createClub',
  '/categoryId/:id': function(id) {
    Session.set('routedCategoryId', id);
    return 'category';
  },
  '/allClubs': function() {
    Session.set('routedClubName', '');
    return 'clubsByName';
  },
  '/clubId/:id': function(id) {
    Session.set('routedClubId', id);
    return 'club'
  },
  '/edit/clubId/:id': function(id) {
    Session.set('routedClubId', id);
    return 'editClub';
  },
  '/profile': function() {
    return 'profile'
  },
  '/mailingList/:id': function(id) {
    Session.set('routedClubId', id);
    return 'mailingList';
  },
  '/sync': function() {
    return 'sync';
  },
  '/sendMessage/:id': function(id) {
    Session.set('routedClubId', id);
    return 'sendMessage';
  },
  '/name': function() {
    Session.set('routedClubName', '');
    return 'clubsByName';
  },
  '/name/:clubName': function(clubName) {
    Session.set('routedClubName', clubName);
    return 'clubsByName';
  },
  '/feedback': 'feedback',
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
  '/notFound': 'notFound',
  '/:error': 'notFound'
});