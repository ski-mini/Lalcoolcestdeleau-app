Meteor.startup(function() {

  Template.selectplayers.onCreated(function() {

    var modefilter = FlowRouter.getParam('modefilter');
    var mode = FlowRouter.getParam('mode');
    Session.set('modefilter', modefilter);
    Session.set('mode', mode);

  });

  Template.selectplayers.events({
    'click .addplayer': function(e) {

      var nb = parseInt(e.currentTarget.dataset.number)+1;

      var html = '<div class="form-group form-group-lg player'+nb+'"><div class="col-sm-10"><input class="form-control player" type="text"  placeholder="Joueur '+nb+'"></div></div>';

      $(html).insertAfter('div.player'+e.currentTarget.dataset.number);
      e.currentTarget.dataset.number = nb;

    },
    'click .letsplay': function() {

      var players = '';
      var nbplayer = 0;

      $('.player').each(function() {
        if($(this).val() !== ''){
          p = Diacritics.remove($(this).val()).toUpperCase();
          players += p+'&$&$&';
          nbplayer++;
        }
      });

      if(nbplayer > 1) {
        if(Session.get('modefilter') == 'solo')
          FlowRouter.go('/play/'+Session.get('mode')+'/'+players+'/'+nbplayer);
        else
          FlowRouter.go('/teamcreate/'+Session.get('mode')+'/'+players+'/'+nbplayer);
      }
      
    }
  });
});