Comments = new Meteor.Collection('comments');
Meteor.methods({
  'addComment': function(options){
    var user = Meteor.user();
    // if (!user) throw new Meteor.Error(413, 'Please sign in first.');
    var name;
    var userId = null;
    if (user){
      userId = user._id;
      try{
        name = user.services.facebook.first_name;
      } catch (e){
        name = 'Anonymous'
      }
    } else {
      name = 'Anonymous'
    }
    return Comments.insert({
      content: options.content,
      clubId: options.clubId,
      authorId: userId,
      authorName: name,
      createdAt: new Date().toJSON(),
      date: new Date().toDateString()
    });
  },
  'editComment': function(options){
    var user = Meteor.user();
    if (!user) throw new Meteor.Error(413, 'Please sign in first.');
    if (Meteor.isServer){
      Comments.update(options.commentId, {
        $set: {
          "content": options.content,
          "date": new Date().toDateString(),
        }
      });
    } 
  },
  'addResponse': function(options){
    var user = Meteor.user();
    // if (!user) throw new Meteor.Error(413, 'Please sign in first.');
    var name;
    var userId = null;
    if (user){
      userId = user._id;
      try{
        name = user.services.facebook.first_name;
      } catch (e){
        name = 'Anonymous'
      }
    } else {
      name = 'Anonymous'
    }
    Comments.update(options.commentId, {
      $push: {
        responses: {
          content: options.content,
          authorId: userId,
          authorName: name,
          createdAt: new Date().toJSON(),
          date: new Date().toDateString(),
        }
      }
    });
  },
  'editResponse': function(options){
    var user = Meteor.user();
    if (!user) throw new Meteor.Error(413, 'Please sign in first.');
    if (Meteor.isServer){
      Comments.update({"responses.createdAt": options.createdAt}, {
        $set: {
          "responses.$.content": options.content,
          "responses.$.date": new Date().toDateString(),
        }
      });
    } 
  },
})