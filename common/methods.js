Meteor.methods({
  insertClub: function(club){
    checkClubFields(club);
    checkDuplicateName(club.name);

    return Clubs.insert(club);
  },
  updateClubContent: function(club, newContent){
    checkClubFields(club, String);
    checkDuplicateName(club.name);

    return Clubs.update(club._id, {
      $set: {content: newContent}
    });
  }
});

function checkClubFields(club){
  if (club.name.length > 140){
    throw new Meteor.Error(413, 'Club name is too long.');
  } else if (club.name.length < 1){
    throw new Meteor.Error(413, 'Missing club name.');
  } else if (club.desc.length > 140){
    throw new Meteor.Error(413, 'Description is too long.');
  } else if (club.desc.length < 1){
    throw new Meteor.Error(413, 'Missing Description.');
  } else if (club.category.length < 1){
    throw new Meteor.Error(413, 'Pick a catgory.');
  }
}

function checkDuplicateName(title){
  var duplicate = Clubs.findOne({name: {$regex: title, $options: 'i'}});
  if (duplicate){
    throw new Meteor.Error(413, 
      "Your club name is too similar to the following, existing club name: "+duplicate.name);
  }
}

