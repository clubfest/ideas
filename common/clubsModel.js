
// Meteor.methods({
//   insertClub: function(club){
//     checkSignedIn();
//     checkClubFields(club);
//     checkDuplicateName(club.name);

//     return Clubs.insert(club);
//   },
//   updateClubContent: function(club, newContent){
//     checkSignedIn();
//     // checkAuthorization(club);
//     checkClubFields(club, String);
//     checkDuplicateName(club.name);

//     return Clubs.update(club._id, {
//       $set: {content: newContent}
//     });
//   }
// });

// function checkClubFields(club){
//   // prevent mongo attack
//   console.log(club)
//   check(club.name, String);
//   check(club.desc, String);
//   check(club.categoryId, String);
//   check(club.categoryName, String);
//   // check(club.createdOn, Number);
//   // make sure the new club has nice front content
//   if (club.name.length > 140){
//     throw new Meteor.Error(413, 'Club name is too long.');
//   } else if (club.name.length < 1){
//     throw new Meteor.Error(413, 'Missing club name.');
//   } else if (club.desc.length > 140){
//     throw new Meteor.Error(413, 'Description is too long.');
//   } else if (club.desc.length < 1){
//     throw new Meteor.Error(413, 'Missing Description.');
//   } else if (club.categoryName.length < 1){
//     throw new Meteor.Error(413, 'Pick a catgory.');
//   }
// }

// function checkSignedIn(){
//   if (!Meteor.userId()){
//     throw new Meteor.Error(413, 'Please sign in first');
//   }
// }

// function checkAuthorization(club){
//   if (Meteor.user==-1){
//     throw new Meteor.Error(413, "Please ask the club's admin for permission to edit.");
//   }
// }
// function checkDuplicateName(title){
//   var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
//   if (duplicate){
//     throw new Meteor.Error(413, 
//       "Your club name is too similar to the following, existing club name: "+duplicate.name);
//   }
// }

