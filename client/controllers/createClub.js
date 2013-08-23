Template.createClub.categories = function(){
  return Categories.find().fetch();
}

Template.createClub.events({
  'submit': function(evt, tmpl){
    evt.preventDefault();
    afterSignIn(function(){
      var newClub = tmplToClubObj(tmpl);
      Meteor.call('addInfoToClubAndInsert', newClub,
        function(err, newClubId){
          if (err) {alert(err.reason+'. Are you signed in?');}
          else {
            Meteor.call("addClubToAdminRolesFirstTime",
              newClubId, Meteor.userId(),
              function(err, resultId){
                if (err) {alert(err.reason+'. Are you signed in?')}
                else {routeToClub(resultId);}
            });
          }
        }
      )
    });
  }
});

function routeToClub(newClubId){
  Meteor.Router.to('/clubId/'+newClubId);
}

function tmplToClubObj(tmpl){
  var catId = tmpl.find('#categoryId').value;
  var cat = Categories.findOne(catId);
  if (!cat) {
    catName = ""
  } else {
    catName = cat.name
  }
  var description = tmpl.find('#desc').value
  return {
    name: tmpl.find('#name').value,
    desc: description,
    categoryId: catId,
    categoryName: catName,
    content: '<h3>About</h3> \
      \n<p>'+description+'</p> \
      \n<h3>Meeting time</h3> \
      \n<p>Click edit to add more info</p>'
  };
}


// function findError(title, description, category){
//   if (title.length > 140){
//     return 'The club name is too long.';
//   } else if (title.length < 1){
//     return 'The club should have a name.';
//   } else if (description.length > 140){
//     return 'Description is too long.';
//   } else if (description.length < 1){
//     return 'Description should have some words.';
//   } else if (category.length < 1){
//     return 'Please pick a catgory.';
//   }
//   var dupName = duplicateName(title);
//   if (dupName){
//     return "A similar club name existed already: "+dupName;
//   } else {
//     return null;
//   }
// }

// function duplicateName(title){
//   var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
//   if (duplicate){
//     return duplicate.name
//   } else {
//     return null;
//   }
// }