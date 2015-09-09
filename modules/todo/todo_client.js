if (Meteor.isClient) {
  Session.setDefault('nowPage', 'all');
///////////////

Template.todoItem.helpers({
  item: function(){
    var data = todo.findOne();
    if (data.data == "new")
    {
      todo.update({_id:data._id},{$set:{data:"read"}});
    }
    return data;
   }
});
Template.todoItem.events({
  'submit form': function(e){
    var data = todo.findOne();
    e.preventDefault();
    var info = Template.instance().$("[name=info]").val();
    // сохранить
    check(info,String);
    todo.update({_id:data._id},{$set:{info:info}});
    //перейти назад
    Router.go('todoIndex', {data:"read"});
  }
});
Template.todoIndexItem.events({
  'click a[name=goToHell]': function(){
     var data = Template.instance().data;
     Router.go('todoItem', {_id: data._id});
   }
});

    Template.todoIndexItem.helpers({
      hidden: function() {return this.data == "hide";},
      new: function() {return this.data == "new";},
      read: function() {return this.data == "read";},

    });
    Template.todoIndex.helpers({
      items: function() {return todo.find();},
      all: function(){ return Session.get('nowPage') == "all";},
      read: function(){return Session.get('nowPage') == "read";},
      hide: function(){return Session.get('nowPage') == "hide";},
      new: function(){ return Session.get('nowPage') == "new";}
    });

    Template.todoIndexItem.events({
        'click button[name=hide]':function(e){
            var data = Template.instance().data;
          //alert(data._id);
          todo.update({_id:data._id},{$set:{data:"hide"}});
        },
      'click button[name=remove]':function(e){
        var data = Template.instance().data;
        Meteor.call('removeItem',data._id);
      }
      });
    Template.todoIndex.events({
      'click button[name=sort]':function(e){
        e.preventDefault();
        //alert('asdas');
        //alert(e.target.value);
        if (e.target.value == 'remove_hide')
        {
          Meteor.call('removeHidden');
        }
        else {
          Router.go('todoIndex', {data: e.target.value});
        }

        //var title = Template.instance().$("input[name=sort]").val();
      },
      'submit form': function(e) {
        e.preventDefault();
        // получить время с сервера
        var title = Template.instance().$("input[name=newItem]").val();

        Meteor.call('nowDT',function(error,nowDT){

          var insert={
            title : title,
            dt : nowDT,
            info : '',
            data : 'new'
          };
          todo.insert(insert);
          //alert('сукабля');
          $("input[name=newItem]").val("");
          //e.getElementById("newItem").value = '';
        });
      }
    });
/////////////////
}
