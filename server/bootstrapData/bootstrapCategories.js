Meteor.startup(function() {
  // Categories.remove({});
  if (Categories.find().count()===0){
    Categories.insert({
      depth: 1,
      name: "Art",
      desc: "Basically everything in life is art"
    });
    Categories.insert({
      depth: 1,
      name: "Business",
      desc: "With money comes responsibility."
    });
    Categories.insert({
      depth: 1,
      name: "Culture",
      desc: 'This is the basis of human society'
    });
    Categories.insert({
      depth: 1,
      name: "Environment",
      desc: "Show your love for the Earth"
    });
    Categories.insert({
      depth: 1,
      name: "Performing Arts",
      desc: "Making life more entertaining"
    })
    Categories.insert({
      depth: 1,
      name: "Politics",
      desc: "It's time to save the government"
    });
    Categories.insert({
      depth: 1,
      name: "Publications",
      desc: "Powerful stuff"
    })
    Categories.insert({
      depth: 1,
      name: "Religion",
      desc: "Powerful stuff"
    })
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