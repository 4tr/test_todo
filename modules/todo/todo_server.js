if (Meteor.isServer) {

// публикация коллекции
Meteor.publish('todo', function(data,_id) {
  //check(data, Match.OneOf(String, undefined));
  //console.log('saf',data);
  check(data,String);
  check(_id,String);

  if (data == 'all')
  {
    if (_id == "all")
      {
        return todo.find();
      }
      else {
        return todo.find({_id:_id});
      }
  }else {
    return todo.find({data:data});
  }
});

// получение времени сервера
Meteor.methods({
  // получение времени сервера
  nowDT: function(){
    return new Date();
  },
  //удаление скрытых
  removeHidden: function(){
    return todo.remove({data:"hide"});
  },
  removeItem: function(item){
    check(item , String);
    return todo.remove({_id:item});
  }

});

}
