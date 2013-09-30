// Apply callback with argument userId,
// after successfully signing in.
// Alert error if unsuccessful.
this.afterSignIn = function(callback){
  if (Meteor.userId()) {
    return callback(Meteor.userId());
  } else {
    Meteor.loginWithFacebook({}, function(err){
      if (!err) {
        return callback(Meteor.userId());
      } else {
        alert(err);
      }
    });
  }
}