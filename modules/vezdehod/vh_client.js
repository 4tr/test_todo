if (Meteor.isClient) {
  Session.setDefault('nowPage', 'all');

Template.vh.events({
  'click button[name=but]' : function(){
    var userId = "GLrweEEjvn8CgWcpm";
    Impersonate.do(userId, function(err, userId) {
    if (err) return;
    console.log("You are now impersonating user #" + userId);
    });
  }
});

}
