Template.comments.comments = function () {
  var comments = Comments.find({}, {sort: {createdAt: 1}}).fetch();
  var userId = Meteor.userId();
  for (var i=0; i<comments.length; i++){
    if (comments[i].authorId==userId){
      comments[i].isAuthor = true;
    }
    var responses = comments[i].responses
    if (responses){
      for (var j=0; j<responses.length; j++){
        if (responses[j].authorId==userId){
          responses[j].isAuthor = true;
        }
      }
    } 
  }
  return comments
};

Template.comments.events({
  'click #comment-btn': function(evt, tmpl){
    var content = tmpl.find('#comment-textarea').value;
    var clubId = Session.get('routedClubId');
    options = {
      clubId: clubId,
      content: content
    }
    Meteor.call('addComment', options, function(err){
      if (err){alert(err.reason);}
      else {tmpl.find('#comment-textarea').value="";}
    });
    var from = 'StartUp.Ideas@ideas.on.meteor.com'
    var receivers = _.map(Clubs.findOne(clubId).adminEmails, function(email){
      return email.address;
    });
    var cc = []
    var replyTo = receivers;
    var subject = 'Someone gave you ideas some feedback';
    Meteor.call('sendToMailingList', from, receivers, cc, replyTo, subject, content, function(err){
      if (err) alert(err);
    });
  },
  'click .respond-btn': function(evt, tmpl){
    var clubId = Session.get('routedClubId');
    var options = {
      commentId: evt.currentTarget.dataset.commentId,
      content: "",
    }
    Meteor.call('addResponse', options, function(err){
      if (err){alert(err.reason);}
    });
    var from = 'StartUp.Ideas@ideas.on.meteor.com'
    var receivers = _.map(Clubs.findOne(clubId).adminEmails, function(email){
      return email.address;
    });
    var cc = [];
    var replyTo = receivers;
    var subject = 'Someone gave you ideas some feedback';
    var content = "Someone left you some feedback at ideas.on.meteor.com/clubId/" + clubId
    Meteor.call('sendToMailingList', from, receivers, cc, replyTo, subject, content, function(err){
      if (err) alert(err);
    });
  },
});

Template.comments.rendered = function(){
  //x-editable
  var tmpl = this;
  $.fn.editable.defaults.mode = 'inline';
  $('.response-editable:not(.editable-click)').each(function(i, editor){
    $(editor).editable('destroy').editable({
      success: function(response, newValue) {
    console.log(editor.dataset);

        var options = {
          createdAt: editor.dataset.createdAt,
          content: newValue
        };
        Meteor.call('editResponse', options, function(err){
          if (err){alert(err.reason);}
        });
      }
    });
  });
  $('.comment-editable:not(.editable-click)').each(function(i, editor){
    $(editor).editable('destroy').editable({
      success: function(response, newValue) {
        var options = {
          commentId: editor.dataset.commentId,
          content: newValue
        };
        Meteor.call('editComment', options, function(err){
          if (err){alert(err.reason);}
        });
      }
    });
  })
};