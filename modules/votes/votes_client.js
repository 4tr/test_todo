if (Meteor.isClient) {

  //подписываемся на публикации


// подписка на ответы перенесена в роутер
//Meteor.subscribe('answers');

Template.votesList.helpers({
    items: function() {
      return votes.find();
}
});
  Session.setDefault('voteResult', 'null');
/*Template.voteWindow.helpers({
   // выгрузка даных в шаблон
      voteItems: function() {
        var list = votes.findOne();
        list.answer.forEach(function(v,k) {
            list.answer[k].index=k;
        });
        return list;
    },
      voteResult: function () {
        return Session.get('voteResult');
      }
    });*/


    // получение данных из фонмы голосования
    Template.voteWindow.events({
      'submit form': function(e) {
        e.preventDefault();

        //Session.set('voteResult',selItem + "'" + voteId + "'");

         // и тут начинается писдос
         var votePost = {
           //ответ на тест
           //selItem : $("input[name=voteListModal]").filter(':checked').val(),
           selItem : $(e.target).find("input[name=voteListModal]").filter(':checked').val(),
           //voteId : $("button[name=voteListModalSubmit]").val(),
           // идентификатор теста
           voteId : $(e.target).find('button[name=voteListModalSubmit]').val(),
         };
         Session.set('voteResult',votePost.selItem);
         //var errors = validateVotePost(votePost);
      }
    });



}
