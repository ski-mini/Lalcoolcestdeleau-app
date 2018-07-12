Meteor.startup(function() {

    Template.teamcreate.onCreated(function() {
        var modefilter = FlowRouter.getParam('modefilter');
        var mode = FlowRouter.getParam('mode');
        var players = FlowRouter.getParam('players');
        var nbplayer = FlowRouter.getParam('nbplayer');

        players = players.split('&$&$&');
        players.splice(nbplayer, 1);

        Session.set('modefilter', modefilter);
        Session.set('mode', mode);
        Session.set('players', players);
        Session.set('nbplayer', nbplayer);

        var teams = createTeams();
        Session.set('teams', teams);

        var teamName = ['LES JAGERMONSTERS', 'LA DRINK TEAM', 'LA CLIQUE ETHYLIQUE', 'LES MOJITUEURS', 'LES SIX ROSES', 'LES TEKILAIDS', 'LES TONNEAUX SANS FONDS', 'LES MAITRES DE L\'IVRESSE', 'LES TILOTESTES'];
        teamName.shuffle();
        Session.set('teamName1', teamName[0]);
        Session.set('teamName2', teamName[1]);

    }); 

    Template.teamcreate.events({
      'click .letsplay': function() {
        var teamName1 = Session.get('teamName1');
        var teamName2 = Session.get('teamName2');

        var players = teamName1+'&$&$&'+teamName2;

        FlowRouter.go('/play/'+Session.get('mode')+'/'+players+'/2');
        
      }
    });

    Template.teamcreate.helpers({
      team: function(){
        var teamName1 = Session.get('teamName1');
        var teamName2 = Session.get('teamName2');
        var teams = Session.get('teams');

        return {
          a: teams.team1+" font partis de l'équipe "+teamName1,
          b: teams.team2+" font partis de l'équipe "+teamName2
        };
      }
    });

    function createTeams(){

      var players = Session.get('players');
      var nbplayer = Session.get('nbplayer');
      nbTeam1 = Math.ceil(nbplayer/2);
      nbTeam2 = nbplayer-nbTeam1;
      players.shuffle();
      var team1, team2;

      players.forEach(function(e){
        if(nbTeam1 > 0){
          if(nbTeam1 == 1){
            if(Math.ceil(nbplayer/2) === 1){
              team1 = e;
            }
            else{
              team1 += ' et '+e;
            }
          }else if(nbTeam1 === Math.ceil(nbplayer/2)){
            team1 = e;
          }
          else{
            team1 += ', '+e;
          }
          nbTeam1--;
        }else if(nbTeam2 > 0){
          if(nbTeam2 == 1){
            if(nbplayer-Math.ceil(nbplayer/2) === 1){
              team2 = e;
            }
            else{
              team2 += ' et '+e;
            }
          }else if(nbTeam2 === nbplayer-Math.ceil(nbplayer/2)){
            team2 = e;
          }else{
            team2 += ', '+e;
          }
          nbTeam2--;
        }
      });

      return {
        team1: team1,
        team2: team2
      };
    }

});