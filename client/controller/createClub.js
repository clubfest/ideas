Template.createClub.events({
  'submit': function(evt, tmpl){
    evt.preventDefault();
    name = tmpl.find('#name').value;
    desc = tmpl.find('#desc').value;
    category = tmpl.find('#category').value;
    var err_msg = findError(name, desc, category);
    if (err_msg){
      alert(err_msg);
      return;
    } else {
      Clubs.insert(
        {
          name: name,
          desc: desc,
          category: category,
          depth: 2,
          content: '<p>'+desc+'</p> <h3>About</h3> <h3>Meeting time</h3>'
        }, function(err){
          if (err){
            alert(err);
          } else {
            Meteor.Router.to('/clubs/'+name);
          }
        }
      );
    }
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