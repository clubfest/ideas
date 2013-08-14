
// Used for club.html and editClub.html
Handlebars.registerHelper('isClubAdmin', function(){
  var clubId = Session.get('routedClubId');
  return isClubAdmin(clubId);
});


// Used for club.html and editClub.html
// Handlebars.registerHelper('currClub', function(){
//   var club = clubNameToObject(Session.get('routedClubName'));
//   if (club==null){
//     return {err: true, msg: 'Invalid club name'}
//   } else {
//     return club;
//   }
// });

// Handlebars.registerHelper('currCategory', function(){
//   var category = categoryNameToObject(Session.get('routedCategoryName'));
//   return category;
// });

// Handlebars.registerHelper('getClubs', function(){
//   var categoryName = Session.get('currCategoryName');
//   var clubs = Clubs.find({category: categoryName}).fetch();
//   return clubs
// });


// function clubNameToObject(clubName){
//   var club = Clubs.findOne({name: clubName});
//   var answer
//   if (club){
//     answer = club;
//   } else {
//     club = Clubs.findOne({name: {$regex: clubName, $options: 'i'}});
//     if (club) {
//       answer = club
//     } else {
//       answer = null;
//     }
//   }
//   return answer;
// }

// function categoryNameToObject(categoryName){
//   var category = Categories.findOne({name: categoryName});
//   var answer
//   if (category){
//     answer = category;
//   } else {
//     category = Categories.findOne({name: {$regex: categoryName, $options: 'i'}});
//     if (category) {
//       answer = category
//     } else {
//       answer = null;
//     }
//   }
//   return answer;
// }


