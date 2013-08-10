function categoryNameToObject(categoryName){
  var category = Categories.findOne({name: categoryName});
  var answer
  if (category){
    answer = category;
  } else {
    category = Categories.findOne({name: {$regex: categoryName, $options: 'i'}});
    if (category) {
      answer = category
    } else {
      answer = null;
    }
  }
  return answer;
}

Template.clubs.currCategoryClubs = function(){
  var category = categoryNameToObject(Session.get('routedCategoryName'));
  console.log(category);
  if (category == null){
    return {err: true, msg: 'Invalid category',
      clubs: Clubs.find({}).fetch()}
  } else {
    return {
      categoryName: category.name,
      clubs: Clubs.find({category: category.name}).fetch()
    };
  }
}