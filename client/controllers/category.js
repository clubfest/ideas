Template.category.clubs = function() {
  var category = Categories.findOne(
    Session.get('routedCategoryId'));
  if (category == null) {
    return Clubs.find({
      removed: null
    }).fetch().sort(caseInsensitiveNameSort);
  } else {
    return Clubs.find({
      categoryId: category._id,
      removed: null
    }).fetch().sort(caseInsensitiveNameSort);
  }
}

Template.category.categoryName = function() {
  var category = Categories.findOne(
    Session.get('routedCategoryId'));
  if (category == null) {
    return null;
  } else {
    return category.name;
  }
}