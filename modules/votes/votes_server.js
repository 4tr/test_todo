if (Meteor.isServer) {

//публикация

/*Meteor.publish('answers', function(userId) {
    return answers.find({userId :userId});
});*/
//публикуем вопросы для всех
Meteor.publish('votes', function(id) {
    // check(id, String);
    // return Meteor.votes.find({ _id: id });
   return votes.find();

});

//публикуем вопросы для всех
Meteor.publish('vote', function(id) {
    check(id, String);
    return votes.find({ _id: id });
});


//публикуем ответы для их владельца
Meteor.publish('answers', function() {
//  return answers.find({userId: this.userId});
  return answers.find({userId: this.userId});
});


// создаю фейковые ответы
if (answers.find({userId:'123'}).count() === 0) {
  var now = new Date().getTime();
answers.insert({
voteId:'123',
userId:'123',
answers:['0'],
time:now,
status:'ok'
});

}



// создаем новое голосование
if (votes.find().count() === 0) {

  var now = new Date().getTime();
  votes.insert(
    {
      title: "проверочный тест",
      users: 0,
      quest:{
              tupe:'none',
              time:now,
              countUsers:0,
              Stop:'',
              Confirm:'onlyOne'
            },
      time:now,
      startTime:now,
      stopTime:now,
      answer:[  {name:'проверка'},
                {name:'вариант два'},
                {name:'ниасилил'}
              ],
      tupeAnswer:'radio'
    }
  );

}

}
