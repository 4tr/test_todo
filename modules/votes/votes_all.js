// объявляю коллекции

// коллекция голосований
votes = new Mongo.Collection('votes');
// коллекция ответов * надо переделать на коллекцию универсальной базы
answers = new Mongo.Collection('answers');

/*
answers.allow({
  find: function(userId) { return true;},
});*/
answers.deny({
  insert: function() { return true;},
  update: function() { return true;},
  remove: function() { return true;},
});


// маршрутизация
//Router.route('/vote', {name: 'voteWindow'});
Router.route('/votes', {
  name: 'votesList',
  waitOn: function() {
    return [
      Meteor.subscribe('votes'),
      Meteor.subscribe('answers')
    ];
  }
});

Router.route('/vote/:_id', {
  name: 'voteWindow',
  waitOn: function() {
    //this.params.voteId=this.params._id;
    return [
      //подписка на вопросы
      Meteor.subscribe('vote', this.params._id)
      // Meteor.subscribe('votes')
      //Meteor.subscribe('answers', this.params.voteId),
    ];
  },
  /*voteItems: function() {
    var list = Meteor.votes.findone();
    list.answer.forEach(function(v,k) {
        list.answer[k].index=k;
    });
    return list;
  },*/
});
