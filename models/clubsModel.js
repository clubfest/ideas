Clubs = new Meteor.Collection('Clubs')

Meteor.methods({
  addInfoToClubAndInsert: function(club){
    checkSignedIn();
    checkClubFields(club);
    // checkDuplicateName(club.name);
    club.adminsCount = 1;
    club.membersCount = 0;
    club.createdOn = new Date().getTime();
    club.memberEmails = [];
    address = Meteor.user().services.facebook.email
    club.adminEmails = [{
      address: address,
      createdOn: club.createdOn
    }];
    return Clubs.insert(club);
  },
  updateClubContent: function(clubId, newContent){
    checkSignedIn();
    checkAdmin(clubId);
    return Clubs.update(clubId, {$set: {content: newContent}});
  },
  updateClubInfo: function(clubId, name, desc){
    var club = Clubs.findOne(clubId);
    club.name = name;
    club.desc = desc;    
    checkSignedIn();
    checkAdmin(clubId);
    checkClubFields(club);
    return Clubs.update(clubId, {$set: {
      name: name,
      desc: desc,
    }});
  },
  addListServName: function(name, clubId){
    checkAdmin(clubId);
    Clubs.update(clubId, {$set: {listServ: name}});
  },
  addUserEmailToMemberEmails: function(email, clubId){
    check(email, String);
    //checkDuplicateEmail(email, clubId);
    // checkAdmin(clubId);
    Clubs.update(clubId, {
      $push: {memberEmails: {address: email, createdOn: new Date().getTime()}}
    });
    Clubs.update(clubId, {$inc: {membersCount: 1}});
  },
  removeUserEmailFromMemberEmails: function(email, clubId){
    // checkAdmin(clubId);
    Clubs.update(clubId, {
      $pull: {memberEmails: {address: email}}
    });
    Clubs.update(clubId, {
      $set: {membersCount: Clubs.findOne(clubId).memberEmails.length}
    });
  },
  addUserEmailToAdminEmails: function(email, clubId){
    checkAdmin(clubId);
    checkDuplicateAdminEmail(email, clubId);
    Clubs.update(clubId, {
      $push: {adminEmails: {address: email, createdOn: new Date().getTime()}}
    });
    Clubs.update(clubId, {$inc: {adminsCount: 1}});
  },
  removeUserEmailFromAdminEmails: function(email, clubId){
    checkAdmin(clubId);
    Clubs.update(clubId, {
      $pull: {adminEmails: {address: email}}
    });
    Clubs.update(clubId, {
      $set: {adminsCount: Clubs.findOne(clubId).adminEmails.length}
    });
  },
  removeClub: function(clubId){
    if (!isSuperUser()){
      checkAdmin(clubId);
    }
    // var club = Clubs.findOne(clubId);
    // var email;
    // for (var i=0; i<club.adminEmails.length; i++){
    //   email = club.adminEmails[i];
    //   Meteor.users.findOne({
    //     "services.google.email": {
    //       $regex: new RegExp(email, 'i')
    //     }
    //   })
    // }
    Clubs.update(clubId, {
      $set: {removed: true}
    });
    
  }
})

function checkDuplicateEmail(email, clubId){
  email = email.toLowerCase();
  var club = Clubs.findOne(clubId);
  console.log('clubId is ', club)
  if (!club.memberEmails){
    return;
  }
  for (var i=0; i<club.memberEmails.length; i++){
    if (club.memberEmails[i].address.toLowerCase() == email){
      throw new Meteor.Error(413, 'The email you are trying to add is duplicate.')
    }
  }
}

function checkDuplicateAdminEmail(email, clubId){
  email = email.toLowerCase();
  var club = Clubs.findOne(clubId);
  for (var i=0; i<club.adminEmails.length; i++){
    if (club.adminEmails[i].address.toLowerCase() == email){
      throw new Meteor.Error(413, 'The email you are trying to add is duplicate.')
    }
  }
}


function checkClubFields(club){
  // prevent mongo attack
  check(club.name, String);
  check(club.desc, String);
  check(club.categoryId, String);
  check(club.categoryName, String);
  // check(club.createdOn, Number);
  // make sure the new club has nice front content
  if (club.name.length > 140){
    throw new Meteor.Error(413, 'Name is too long.');
  } else if (club.name.length < 1){
    throw new Meteor.Error(413, 'Missing project name.');
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

this.checkAdmin = function(clubId){
  if (!isClubAdmin(clubId)){
    throw new Meteor.Error(413, "Only admin can edit.");
  }
}
function isSuperUser(){
  return Meteor.user().services.facebook.email.toLowerCase() == 'chorhanglam@gmail.com'
}
function checkDuplicateName(title){
  var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
  if (duplicate){
    throw new Meteor.Error(413, 
      "Your project name is too similar to the following, existing project name: "+duplicate.name);
  }
}