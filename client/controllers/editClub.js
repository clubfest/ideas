Template.editClub.created = function(){
  Session.set('atClubHome', false)
}

Template.editClub.getClub = function(){
  return Clubs.findOne(Session.get('routedClubId'));
}


Template.editClub.events({
  'click #save-content': function(evt, tmpl){
    var clubId = Session.get('routedClubId');
    var content = tmpl.find('#content-editor').value;
    Meteor.call('updateClubContent',
      clubId, content,
      function(err){
        if (err){
          alert(err.reason);
        } else {
          Meteor.Router.to('/clubId/'+clubId);
        }
      }
    );
  },
  'click #save-info': function(evt, tmpl){
    var clubId = Session.get('routedClubId');
    var name = tmpl.find('#name-editor').value;
    var desc = tmpl.find('#desc-editor').value;
    Meteor.call('updateClubInfo',
      clubId, name, desc, 
      function(err){
        if (err){
          alert(err.reason);
        }
      }
    )
  },
  'click #remove-btn': function(){
    var clubId = Session.get('routedClubId');
    Meteor.call('removeClub', clubId, function(err){
      if (err){
        alert(err);
      } else {
        Meteor.call('removeClubFromAdminRoles', 
          clubId, Meteor.userId(),
          function(){
            if (err){
              alert(err);
            }
          }
        );
        Meteor.Router.to('/profile');
      }
    });
  }
  // 'click #remove-btn': function(evt, tmpl){
  //   var clubId = Session.get('routedClubId');
  //   var club = Clubs.findOne(clubId);
  //   shouldRemove = confirm('Are you sure?')
  //   if (!shouldRemove) {return ;}
  //   Meteor.call('sendEmail',
  //     club.adminEmails,
  //     'club.fest.on.meteor@gmail.com',
  //     'Info of the club you just deleted',
  //     JSON.stringify(club), function(err){
  //       if (err){
  //         alert(err.reaseon);
  //       } else {
  //         Meteor.call('removeClub', clubId, function(err){
  //           if (err){
  //             alert(err.reason);
  //           } else {
  //             Meteor.Router.to('/profile');
  //           }
  //         });
  //       }
  //     }
  //   );
  // }
});


Template.editClub.rendered = function(){
  $('#content-editor').wysihtml5('deepExtend', {
    parserRules: {
      tags: {
        iframe: {
          "check_attributes": {
            src: "url",
            width: "numbers",
            height: "numbers"
          }
        },
        p: {
        }
      }
    },
    html: true,
  });
}
