Meteor.startup(function() {

  Template.dldeck.onCreated(function() {

    var deckId = FlowRouter.getParam('deckId');

    HTTP.call("GET", dist_url+'/json/deck/'+deckId,
      {},
      function (error, result) {

        if (!error) {
          var deck = JSON.parse(result.content);
          deck[0][0]['username'] = deck[0].username;
          deck.push(deck[0]);
          Session.set('deck', deck[0][0]);
        }
        else {
          Session.set('deck', '');
        }
        $('.spinner').hide();
      }
    );

    HTTP.call("GET", dist_url+'/json/rules/smallList/'+deckId,
      {},
      function (error, result) {

        if (!error) {
          var rulesExample = JSON.parse(result.content);
          rulesExample.forEach(function(e){
            e.text = e.text.replaceAll('$.j1', 'Michel1');
            e.text = e.text.replaceAll('$.j2', 'Michel2');
            e.text = e.text.replaceAll('$.j3', 'Michel3');
            e.text = e.text.replaceAll('$.j4', 'Michel4');
          });
          Session.set('rulesExample', rulesExample);
        }
        else {
          Session.set('rulesExample', '');
        }
        $('.spinnerRules').hide();
      }
    );

  });

  Template.dldeck.events({
    'click .seeAllRules': function(e) {
      FlowRouter.go('/dl/deck/'+e.currentTarget.dataset.id);
    },
    'click .dl': function(e) {
      $('.dl').html('<i class="fa fa-spinner fa-pulse fa-fw pull-right"></i> Téléchargement...');
      var deck = Session.get('deck');
      var insertId = 
        Decks.insert({
          "deckId": deck.id,
          "deckType": deck.decktype.id,
          "deckName": deck.name,
          "rules": []
        });

      HTTP.call("GET", dist_url+'/json/rules/list/'+deck.id,
        {},
        function (error, result) {

          if (!error) {
            var rules = JSON.parse(result.content);
            rules.forEach(function(r){
              if(r.ruletype.id == 1){
                Decks.update({ _id: insertId },{ $push: { rules: {text: r.text} }});
              }
              else if(r.ruletype.id == 2){
                //Multiple
                var text = JSON.parse(r.text);
                Decks.update({ _id: insertId },{ $push: { rules: {text: text[0], id: r.id} }});
                Decks.update({ _id: insertId },{ $push: { rules: {text: text[1], condition: r.id} }});
              }
              else if(r.ruletype.id == 3){
                Decks.update({ _id: insertId },{ $push: { rules: {text: JSON.parse(r.text)} }});
              }
            });
          }
          else {
            $('.dl').html('error');
          }
          if(deck.decktype.id == 1)
            var mode = 'solo';
          else
            var mode = 'team';

          FlowRouter.go('/selectmode/'+mode);
        }
      );
    }
  });

  Template.dldeck.helpers({
    deck: function() {
      return Session.get('deck');
    },
    rulesExample: function() {
      return Session.get('rulesExample');
    },
    deckExist: function() {
      deck = Session.get('deck');
      if(Decks.find( {deckId: Number(deck.id)} ).count() === 0) {
        return false;
      }
      else {
        return true;
      }
    }
  });

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

});