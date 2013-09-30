Deps.autorun(function(){
  Meteor.subscribe('allComments', {clubId: Session.get('routedClubId')});
})
