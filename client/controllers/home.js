Template.home.getCategories = function() {
  return Categories.find({}, {
    sort: {
      name: 1
    }
  }).fetch();
}