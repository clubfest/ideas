var assert = require('assert');

suite('Clubs', function() {
  test('insert by client', function(done, server, c1) {
    c1.eval(function() {
      Meteor.call("createUser", {
        name: 'a',
        email: 'a@a.com',
        password: '123456'
      });
      Meteor.loginWithPassword('a', '123456');
      Meteor.call("insertClub", {
        name: 'Aikido',
        category: 'Sports',
        desc: 'Japanese Martial Arts',
        content: 'Join us'
      });
      var docs = Clubs.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 1);
      done();
    });
  });
});

// test('using two client', function(done, server, c1, c2) {
//   c1.eval(function() {
//     Clubs.find().observe({
//       added: addedNewPost
//     });

//     function addedNewPost(post) {
//       emit('post', post);
//     }
//     emit('done');
//   }).once('post', function(post) {
//     assert.equal(post.title, 'from c2');
//     done();
//   }).once('done', function() {
//     c2.eval(insertPost);
//   });

//   function insertPost() {
//     Posts.insert({title: 'from c2'});
//   }
// });