Handlebars.registerHelper('currClub', function(){
  var clubName = Session.get('currClubName');
  var club = Clubs.findOne({name: {$regex: clubName, $options: 'i'}});
  if (club){
    return club;
  } else {
    return {name: "The club you are searching for is not available."}
  }
});

Handlebars.registerHelper('currCategory', function(){
  var categoryName = Session.get('currCategoryName');

  var category = Categories.findOne({name: {$regex: categoryName, $options: 'i'}}, {sort: {_id: -1}});
  if (category){
    // make sure clubs are displayed from the correct category later
    Session.set('currCategoryName', category.name);
    return category;
  } else {
    return {name: "The category you are searching for is not available."}
  }
});