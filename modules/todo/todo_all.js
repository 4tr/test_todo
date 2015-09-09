
// коллекция
todo = new Mongo.Collection('todo');

//права
todo.allow({
  insert: function() {return true;},
  remove: function() {return true;},
  update: function() {return true;},
});
//маршрутизация
Router.route('/todoItem/:_id', {
  name: 'todoItem',
  waitOn: function() {
    //Session.set('nowPage', this.params.data);
    return Meteor.subscribe('todo', 'all',this.params._id);
  }
});


Router.route('/todo/:data', {
  name: 'todoIndex',
  waitOn: function() {
    Session.set('nowPage', this.params.data);
    return Meteor.subscribe('todo', this.params.data , "all");
  },
  onBeforeAction:function(){
    if (this.params.data == 'all')
    {
      //this.render('todoAll');
      Router.go('todoAll');
    }
    this.next();
  }
});


Router.route('/todo', {
  name: 'todoAll',
  template:'todoIndex',
  waitOn: function(){
    Session.set('nowPage', 'all');
    return Meteor.subscribe('todo',"all","all");

  }
});

////Router.go('postPage', {_id: result._id});
