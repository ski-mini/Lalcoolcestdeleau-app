Meteor.startup(function() {
    if (Decks.find().count() === 0) {
        Decks.insert({
            "deckId": "1",
            "deckType": "1",
            "deckName": "Classique",
            "rules": [
                { "text": "$.j1 et $.j2 font un combat de pouce, 1 gorgée en jeu !" },
                { "text": "$.j1 distribue 2 gorgées !" },
                { "text": "Tout le monde boit une gorgée" },
                { "text": "Test de règle en 2 temps, $.j1 roi des pouces", "id": "-1" },
                { "text": "Test de règle en 2 temps, $.j1 n'est plus le roi des pouces", "condition": "-1" },
                { "text": ["Attention on se prépare pour des tests règles à la suite, choississez vos champions, $.j1 commence", "donner le plus de fdp en 25secondes", "bravo on peut continuer, test en 3 suites succeed"] },
                { "text": "$.j1 raconte une crasse sur $.j2 sinon il/elle boit 2 gorgées" }
            ]
        });

        Decks.insert({
            "deckId": "2",
            "deckType": "1",
            "deckName": "Classique pour alcoolique",
            "rules": [
                { "text": "$.j1 et $.j2 font un combat de pouce, 5 gorgée en jeu !" },
                { "text": "$.j1 distribue 4 gorgées !" },
                { "text": "Tout le monde fini son verre" },
                { "text": "$.j1 raconte une crasse sur $.j2 sinon il/elle boit le verre de $.j2 !" }
            ]
        });

        Decks.insert({
            "deckId": "3",
            "deckType": "2",
            "deckName": "Classique",
            "rules": [
                { "text": "$.j1 et $.j2 font un combat de pouce, 1 gorgée en jeu !" },
                { "text": "$.j1 distribue 2 gorgées !" },
                { "text": "Tout le monde boit une gorgée" },
                { "text": "$.j1 raconte une crasse sur $.j2 sinon il/elle boit 2 gorgées" }
            ]
        });
    }
    
    Template.home.events({
        'click .create': function(e) {
            FlowRouter.go('/selectmode/'+e.currentTarget.dataset.mode);
        },
        'click .jumbotron': function(e) {
            window.open(dist_url, '_blank');
        }
    });

});