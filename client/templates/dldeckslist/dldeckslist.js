Meteor.startup(function() {

  Template.dldeckslist.onCreated(function() {

    var modefilter = FlowRouter.getParam('modefilter');
    Session.set('modefilter', modefilter);

    if(modefilter == 'solo')
      var nbmodefilter = 1;
    else
      var nbmodefilter = 2;

    HTTP.call("GET", dist_url+'/json/deck/list/'+nbmodefilter,
      {},
      function (error, result) {

        if (!error) {
          var decksList = [];
          var allDecksList = JSON.parse(result.content);
          allDecksList.forEach(function(e){
            if(Decks.find( {deckId: Number(e[0].id)} ).count() === 0) {
              e[0]['username'] = e.username;
              decksList.push(e[0]);
            }
          });
          decksList.sort(function(a, b){
              return b.ranking - a.ranking;
          });
          Session.set('decksList', decksList);
        }
        else {
          Session.set('decksList', '');
        }
        $('.spinner').hide();
      }
    );
  });

  Template.dldeckslist.events({
    'click .seeDeck': function(e) {
      FlowRouter.go('/dl/deck/'+e.currentTarget.dataset.id);
    }
  });

  Template.dldeckslist.helpers({
    decksList: function() {
      return Session.get('decksList');
    },
    modefilter: function() {
      return Session.get('modefilter');
    }
  });


});