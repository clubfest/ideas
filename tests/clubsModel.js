var assert = require('assert');

suite('Clubs', function() {
  test('in the server', function(done, server) {
    server.eval(function() {
      Clubs.insert({name: 'Aikido', category: 'Sports', desc: 'Japanese Martial Arts', content: 'Join us'});
      var docs = Clubs.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 1);
      done();
    });
  });
});