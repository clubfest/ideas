// Meteor.startup(function(){
//   Categories.allow({
//     insert: function(){
//       return false;
//     }
//   });
//   Clubs.allow({
//     insert: function(userId, doc){
//       try{
//         check(doc.name, String);
//         check(doc.desc, String);
//         check(doc.category, String);
//         check(doc.content, String);
//       } catch (err){
//         return false;
//       }
//       if (doc.name.length < 1 || doc.desc.length <1){
//         return false;
//       } else if (doc.name.length > 140 || doc.desc.length > 140) {
//         return false;
//       } else {
//         return true;
//       } 
//     },
//     update: function(userId, doc){
//       try{
//         check(doc.name, String);
//         check(doc.desc, String);
//         check(doc.category, String);
//         check(doc.content, String);
//       } catch (err){
//         return false;
//       }
//       if (doc.name.length < 1 || doc.desc.length <1){
//         return false;
//       } else if (doc.name.length > 140 || doc.desc.length > 140) {
//         return false;
//       } else {
//         return true;
//       }
//     }
//   })
// })
//   