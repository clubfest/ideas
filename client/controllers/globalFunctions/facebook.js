this.postToGroup = function(message, link){
  var address = [
    "https://graph.facebook.com/1418616305028237/feed?access_token=",
    Meteor.user().services.facebook.accessToken,
    "&message=",
    encodeURIComponent(message),
    "&link=",
    encodeURIComponent(link)
  ].join("")
  HTTP.call("POST", address, function(err, resp){
    if (err){
      console.log(err)        
    } else {
      console.log(resp)
    }
  });
}