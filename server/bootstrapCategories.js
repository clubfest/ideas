Meteor.startup(function() {
  Categories.remove({});
  if (Categories.find().count()===0){
    Categories.insert({
      depth: 1,
      name: "Academic",
      desc: "Deep thoughts has no bottom"
    });
    Categories.insert({
      depth: 1,
      name: "Business",
      desc: "With money comes responsibility."
    });
    Categories.insert({
      depth: 1,
      name: "Cultural",
      desc: 'This is the basis of human society'
    });
    Categories.insert({
      depth: 1,
      name: "Environmental",
      desc: "Show your love for the Earth"
    });
    Categories.insert({
      depth: 1,
      name: "Other",
      desc: "Something different from others"
    });
    Categories.insert({
      depth: 1,
      name: "Performing",
      desc: "Fun stuff"
    })
    Categories.insert({
      depth: 1,
      name: "Political",
      desc: "It's time to save the government"
    });
    Categories.insert({
      depth: 1,
      name: "Sports",
      desc: "It's in the game, that you learn to live."
    });
    Categories.insert({
      depth: 1,
      name: "Technology",
      desc: "It's time to conquer the machines."
    });
  }
});