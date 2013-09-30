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
    message = content+"\n\n-- comment for http://ideas.on.meteor.com/clubId/"+clubId
    postToGroup(message, "ideas.on.meteor.com");
  },
  'click .respond-btn': function(evt, tmpl){
    var dom = evt.currentTarget;
    var commentId = dom.dataset.commentId;
    $(dom).prev().append("<textarea></textarea> <a class='btn respond-comment' data-comment-id='"+commentId+"'>Submit</a>");
    $(dom).remove();
  },
  'click .respond-comment': function(evt, tmpl){
    var clubId = Session.get('routedClubId');
    var dom = evt.currentTarget;
    var commentId = dom.dataset.commentId;
    var content = $(dom).prev().val();
    var options = {
      commentId: commentId,
      content: content,
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
    var message = content + "\n\n --response at ideas.on.meteor.com/clubId/" + clubId
    Meteor.call('sendToMailingList', from, receivers, cc, replyTo, subject, message, function(err){
      if (err) alert(err);
    });
    postToGroup(message, "ideas.on.meteor.com");
  },
});

Template.comments.rendered = function(){
  //x-editable
  var tmpl = this;
  $.fn.editable.defaults.mode = 'inline';
  $('.response-editable:not(.editable-click)').each(function(i, editor){
    $(editor).editable('destroy').editable({
      inputclass: 'editting',
      success: function(response, newValue) {
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
      inputclass: 'editting',
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