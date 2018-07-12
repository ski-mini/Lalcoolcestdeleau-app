FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'home'
    });
  },
  name: 'home'
});

FlowRouter.route( '/selectmode/:modefilter', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'selectmode'
    });
  },
  name: 'selectmode'
});

FlowRouter.route( '/selectplayers/:modefilter/:mode', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'selectplayers'
    });
  },
  name: 'selectplayers'
});

FlowRouter.route( '/teamcreate/:mode/:players/:nbplayer', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'teamcreate'
    });
  },
  name: 'teamcreate'
});

FlowRouter.route( '/play/:mode/:players/:nbplayer', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'play'
    });
  },
  name: 'play'
});

FlowRouter.route( '/dl/decks/:modefilter/list', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'dldeckslist'
    });
  },
  name: 'dldeckslist'
});

FlowRouter.route( '/dl/deck/:deckId', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', {
      main: 'dldeck'
    });
  },
  name: 'dldeck'
});