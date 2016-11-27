(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var Game = require('bingo-core');
        var game = new Game();

        var generatedCombinationsList = document.getElementById('generated-combinations');
        var generatedCombinationLabel = document.getElementById('generated-combination');
        var nextCombinationButton = document.getElementById('next-combination');
        var newGame = document.getElementById('new-game');
        var allCombinationsAreGenerated = 'All combinations are generated';

        nextCombinationButton.addEventListener('click', function() {
            if (generatedCombinationLabel.textContent && generatedCombinationLabel.textContent !== allCombinationsAreGenerated) {
                var nextCombinationListItem = document.createElement('li');
                nextCombinationListItem.textContent = generatedCombinationLabel.textContent;
                generatedCombinationsList.appendChild(nextCombinationListItem);
            }

            if (game.areCombinationsAvailable()) {
                var nextCombination = game.nextCombination();
                generatedCombinationLabel.textContent = nextCombination.prefix + nextCombination.value;
            } else {
                generatedCombinationLabel.textContent = allCombinationsAreGenerated;
            }
        });

        newGame.addEventListener('click', function() {
            game = new Game();
            generatedCombinationLabel.textContent = '';
            while (generatedCombinationsList.firstChild) {
                generatedCombinationsList.removeChild(generatedCombinationsList.firstChild);
            }
        });
    });
})();