Meteor.startup(function() {
  // Categories.remove({});
  // Clubs.remove({});
  if (Categories.find().count()===0){
    Categories.insert({
      name: "Social",
      desc: "Facebook and Twitter"
    });
    Categories.insert({
      name: "Entertainment",
      desc: "Youtube and Netflix"
    });
    Categories.insert({
      name: "Education",
      desc: 'StackOverflow and Quora'
    });
    Categories.insert({
      name: "Data",
      desc: 'Google and weedmatch.io'
    });
    Categories.insert({
      name: "Commerce",
      desc: "Ebay and Amazon"
    });
    Categories.insert({
      name: "Location",
      desc: "Four Square"
    });
    Categories.insert({
      name: "Developers Productivity",
      desc: "Github and MeteorJS"
    });
    Categories.insert({
      name: "Productivity",
      desc: "Instagram"
    });
  }
});