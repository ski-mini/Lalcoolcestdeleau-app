Meteor.startup(function() {


    Template.play.onCreated(function() {

        var deckId = FlowRouter.getParam('mode');
        var players = FlowRouter.getParam('players');
        var nbplayer = FlowRouter.getParam('nbplayer');

        players = players.split('&$&$&');
        players.splice(nbplayer, 1);

        Session.set('deckId', deckId);
        Session.set('players', players);
        Session.set('nbplayer', nbplayer);

        var rules = createRules();

        Session.set('rules', rules);
    });

    Template.play.rendered = function() {
      $('div.play').css('width', screen.height);
      $('div.play').css('height', screen.height);
    };

    Template.play.events({
      'click .nextrule': function(e) {
        var rules = Session.get('rules');
        var nbrules = Session.get('nbrules');
        var nb = parseInt(e.currentTarget.dataset.number)+1;
        if(nb < nbrules){
            $('div.rule').html(rules[nb]);
            e.currentTarget.dataset.number = nb;
        }else{
            $('div.rule').html("C'est déjà fini :(");
            $('<button type="button" class="btn btn-primary btn-lg replay">Rejouer !</button>').insertAfter('.nextrule');
            $('.nextrule').remove();
        }
      },
      'click .replay': function() {
        FlowRouter.go('/');
      },
      'click .leavebutton button': function() {
        FlowRouter.go('/');
      }
    });

    Template.play.helpers({
      rule: function(){
        rules = Session.get('rules');
        return rules[0];
      },
      deckId: function(){
        return Session.get('deckId');
      },
    });

    function createRules(){

        var players = Session.get('players');
        var nbplayer = Session.get('nbplayer');
        var deckId = Session.get('deckId');

        var deck = Decks.findOne({deckId: Number(deckId)});

        deck.rules.shuffle();

        var generatedRules = [];
        var condition = [];
        var conditionId = [];

        // /!\ methode a larrache pr compter les rules avec les multiparts... degolass à changer
        var nbrules = 0;
        deck.rules.forEach(function(e){
          if(Array.isArray(e.text)){
            e.text.forEach(function(e){
              nbrules++;
            });
          }
          else{
            nbrules++;
          }
        });
        Session.set('nbrules', nbrules);


        //toutes les règles à conditions : la 2eme partie est mise de cotée
        deck.rules.forEach(function(e){
          if(e.condition){
            condition.push(e);
            deck.rules.splice(deck.rules.indexOf(e), 1);
          }
        });

        var nbtotal = nbrules-condition.length;
        var i = 0;

        //Pour chaque rule qui existent dans le deck (déjà mélangé) on va générer les joueurs
        deck.rules.forEach(function(e){
          i++;
          players.shuffle();
          if(Array.isArray(e.text)){
            //rule type sereval parts
            e.text.forEach(function(e){
              rule = e;
              rule = rule.replaceAll('$.j1', players[0]);
              rule = rule.replaceAll('$.j2', players[1]);
              generatedRules.push(rule);
            });
          }
          else{
            //rule simple ou à conditions
            rule = e.text;
            rule = rule.replaceAll('$.j1', players[0]);
            rule = rule.replaceAll('$.j2', players[1]);
            generatedRules.push(rule);
          }

          if(e.id){
            //si la règle possède un id alors il faut que la règle suivante à condition possède les mm noms de joueurs
            conditionId.push(e.id);
            var id = e.id;
            condition.forEach(function(e){
              //on la pré-génére et on la garde au chaud dans son array condition
              if(e.condition == id){
                e.text = e.text.replaceAll('$.j1', players[0]);
                e.text = e.text.replaceAll('$.j2', players[1]);
              }
            });
          }
          else{
            //donc là on est juste après une règle de n'importe quel type
            conditionId.forEach(function(condID){
              var d = Math.random();
              //faut pas qu'elle sorte trop tot ou trop tard
              //d est un float entre 0 et 1
              //i c'est le nombre de règle pr le moment et nbtotal le nombre de règles en tout
              //Exemple : si on est tot dans le jeu et qu'il y a 50 règles total on imagine 10/50 = 0.2 
              //si on est tard dans le jeu... 49/50 = 0.98 
              //d aura plus de chance d'être inférieur a i/nbtotal plus il est tard dans le jeu
              if(d <= i/nbtotal){
                condition.forEach(function(e){
                  if(e.condition == condID){
                    generatedRules.push(e.text);
                  }
                });
                conditionId.splice(conditionId.indexOf(condID), 1);
                condition.splice(condition.indexOf(e), 1);
              }
            });
          }
        });
        return generatedRules;
    }
    
    function randomInt(mini, maxi)
    {
         var nb = mini + (maxi+1-mini)*Math.random();
         return Math.floor(nb);
    }
     
    Array.prototype.shuffle = function(n)
    {
         if(!n)
              n = this.length;
         if(n > 1)
         {
              var i = randomInt(0, n-1);
              var tmp = this[i];
              this[i] = this[n-1];
              this[n-1] = tmp;
              this.shuffle(n-1);
         }
    }

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  };

});