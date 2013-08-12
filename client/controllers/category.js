Template.category.clubs = function(){
  var category = Categories.findOne(
    Session.get('routedCategoryId'));
  if (category == null){
    return Clubs.find({});
  } else {
    return Clubs.find({categoryId: category._id});
  }
}

Template.category.categoryName = function(){
  var category = Categories.findOne(
    Session.get('routedCategoryId'));
  if (category == null){
    return null;
  } else {
    return category.name;
  }
}