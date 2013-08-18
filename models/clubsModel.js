Clubs = new Meteor.Collection('Clubs')

Meteor.methods({
  addInfoToClubAndInsert: function(club){
    checkSignedIn();
    checkClubFields(club);
    checkDuplicateName(club.name);
    club.createdOn = new Date().getTime();
    club.memberEmails = [];
    club.adminEmails = [Meteor.user().services.google.email];
    return Clubs.insert(club);
  },
  updateClubContent: function(clubId, newContent){
    checkSignedIn();
    checkAdmin(clubId);
    return Clubs.update(clubId, {$set: {content: newContent}});
  },
  addUserEmailToMemberEmails: function(email, clubId){
    check(email, String);
    // checkAdmin(clubId);
    Clubs.update(clubId, {
      $addToSet: {memberEmails: {address: email, createdOn: new Date().getTime()}}
    });
  },
  removeUserEmailFromMemberEmails: function(email, clubId){
    Clubs.update(clubId, {
      $pull: {memberEmails: {address: email}}
    });
  },
  addUserEmailToAdminEmails: function(email, clubId){
    Clubs.update(clubId, {
      $addToSet: {adminEmails: {address: email, createdOn: new Date().getTime()}}
    });
  },
  removeUserEmailFromAdminEmails: function(email, clubId){
    Clubs.update(clubId, {
      $pull: {adminEmails: {address: email}}
    });
  }
})


function checkClubFields(club){
  // prevent mongo attack
  check(club.name, String);
  check(club.desc, String);
  check(club.categoryId, String);
  check(club.categoryName, String);
  // check(club.createdOn, Number);
  // make sure the new club has nice front content
  if (club.name.length > 140){
    throw new Meteor.Error(413, 'Club name is too long.');
  } else if (club.name.length < 1){
    throw new Meteor.Error(413, 'Missing club name.');
  } else if (club.desc.length > 140){
    throw new Meteor.Error(413, 'Description is too long.');
  } else if (club.desc.length < 1){
    throw new Meteor.Error(413, 'Missing Description.');
  } else if (club.categoryName.length < 1){
    throw new Meteor.Error(413, 'Pick a catgory.');
  }
}

function checkSignedIn(){
  if (!Meteor.userId()){
    throw new Meteor.Error(413, 'Please sign in first');
  }
}

function checkAdmin(clubId){
  if (!isClubAdmin(clubId)){
    throw new Meteor.Error(413, "Only admin can edit.");
  }
}
function checkDuplicateName(title){
  var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
  if (duplicate){
    throw new Meteor.Error(413, 
      "Your club name is too similar to the following, existing club name: "+duplicate.name);
  }
}