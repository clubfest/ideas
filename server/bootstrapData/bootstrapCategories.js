Meteor.startup(function() {
  // Categories.remove({});
  // Clubs.remove({});
  if (Categories.find().count()===0){
    Categories.insert({
      name: "Art",
      desc: "Basically everything in life is art"
    });
    Categories.insert({
      name: "Business",
      desc: "With money comes responsibility."
    });
    Categories.insert({
      name: "Culture",
      desc: 'This is the basis of human society'
    });
    Categories.insert({
      name: "Leisure",
      desc: 'This should be enough to cover all clubs that does not fit into other categories.'
    });
    Categories.insert({
      name: "Performing Arts",
      desc: "Making life more entertaining"
    });
    Categories.insert({
      name: "Politics",
      desc: "It's time to save the government"
    });
    Categories.insert({
      name: "Publications",
      desc: "Powerful stuff"
    });
    Categories.insert({
      name: "Religion",
      desc: "Powerful stuff"
    });
    Categories.insert({
      name: "Service",
      desc: "Help yourself by helping others"
    });
    Categories.insert({
      name: "Sports",
      desc: "It's in the game, that you learn to live."
    });
    Categories.insert({
      name: "Technology",
      desc: "It's time to conquer the machines."
    });
  }
});