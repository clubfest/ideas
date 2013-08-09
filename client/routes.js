Meteor.Router.add({
  '/': 'home',
  '/instruction': 'instruction',
  '/create_club': 'create_club',
  '/categories': function(){
    return 'all_clubs';
  },
  '/categories/:name': function(name){
    Session.set('currCategoryName', name);
    return 'clubs';
  },
  '/clubs/:name': function(name){
    Session.set('currClubName', name)
    return 'club'
  },
  '/edit_club/:name': function(name){
    Session.set('currClubName', name)
    console.log(name)
    return 'edit_club'
  }
});