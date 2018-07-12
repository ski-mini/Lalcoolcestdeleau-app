Meteor.startup(function() {

    Template.selectmode.onCreated(function() {
        var modefilter = FlowRouter.getParam('modefilter');
        
        Session.set('modefilter', modefilter);
        if(modefilter == 'solo')
          var decksName = Decks.find({deckType:1}).fetch();
        else
          var decksName = Decks.find({deckType:2}).fetch();
        Session.set('decksName', decksName);
    }); 

    Template.selectmode.events({
      'click .create': function(e) {
        FlowRouter.go('/selectplayers/'+Session.get('modefilter')+'/'+e.currentTarget.dataset.mode);
      },
      'click .download': function(e) {
        FlowRouter.go('/dl/decks/'+Session.get('modefilter')+'/list');
      }
    });

    Template.selectmode.helpers({
      modes: function(){
        modes = Session.get('decksName');
        return modes;
      },
      modefilter: function(){
        modefilter = Session.get('modefilter');
        return modefilter;
      }
    });


});