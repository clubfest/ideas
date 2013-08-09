Meteor.Router.add({
  '/': 'index',
  '/instruction': 'instruction',
  '/create_club': 'create_club',
  '/clubs': 'clubs',
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