Template.createClub.categories = function(){
  return Categories.find().fetch();
}
Template.createClub.events({
  'submit': function(evt, tmpl){
    evt.preventDefault();
    var newClub = {
      name: tmpl.find('#name').value,
      desc: tmpl.find('#desc').value,
      category: tmpl.find('#category').value,
      content: '<h3>About</h3> \
        <p>Click edit to add info</p>\
        <h3>Meeting time</h3>'
    }
    Meteor.call("insertClub", newClub,
      function(err, result){
        if (err) {
          alert(err.reason);
        } else {
          Meteor.Router.to('/clubs/'+newClub.name);
        }
      }
    );
  }
})

function findError(title, description, category){
  if (title.length > 140){
    return 'The club name is too long.';
  } else if (title.length < 1){
    return 'The club should have a name.';
  } else if (description.length > 140){
    return 'Description is too long.';
  } else if (description.length < 1){
    return 'Description should have some words.';
  } else if (category.length < 1){
    return 'Please pick a catgory.';
  }
  var dupName = duplicateName(title);
  if (dupName){
    return "A similar club name existed already: "+dupName;
  } else {
    return null;
  }
}

function duplicateName(title){
  var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
  if (duplicate){
    return duplicate.name
  } else {
    return null;
  }
}