(function () {
    'use strict';

    const {ipcRenderer} = require('electron');

    document.addEventListener('DOMContentLoaded', function () {
        var Game = require('bingo-core');
        var game;

        var generatedCombinationLabel = document.getElementById('generated-combination');
        var nextCombinationButton = document.getElementById('next-combination');
        var newGame = document.getElementById('new-game');
        var allCombinationsAreGenerated = '/';
        const versionHeader = document.getElementById('version-header');
        const table = document.getElementById('generated-table');

        ipcRenderer.on('version', (event, arg) => {
            versionHeader.textContent = arg;
        });

        nextCombinationButton.addEventListener('click', function () {
            if (game.areCombinationsAvailable()) {
                var nextCombination = game.nextCombination();
                generatedCombinationLabel.textContent = nextCombination.prefix + " " + nextCombination.value;
                markAsFound(generatedCombinationLabel.textContent);
            } else {
                generatedCombinationLabel.textContent = allCombinationsAreGenerated;
            }
        });

        newGame.addEventListener('click', function () {
            startNewGame();
        });

        startNewGame();

        function startNewGame() {
            game = new Game();
            generatedCombinationLabel.textContent = '';
            table.removeChild(table.firstChild);
            table.appendChild(generateTable());
        }

        function generateTable() {
            let table = document.createElement('table');
            let rows = ['B', 'I', 'N', 'G', 'O'];
            for (let i = 0; i < rows.length; i++) {
                table.appendChild(generateRow(rows[i], (i * 15) + 1, (i * 15) + 15));
            }
            return table;
        }

        function generateRow(prefix, from, to) {
            let row = document.createElement('tr');            
            row.appendChild(generateCell(prefix, prefix));
            for (let i = from; i <= to; i++) {
                row.appendChild(generateCell(prefix, i));
            }
            return row;
        }

        function generateCell(prefix, value) {
            let cell = document.createElement('td');
            if (prefix === value) {
                cell.classList.add('prefix');
            } else {
                cell.classList.add('value');
            }
            cell.setAttribute('id', prefix === value ? prefix : prefix + " " + value);
            cell.textContent = value;
            return cell;
        }

        function markAsFound(id) {
            let cell = document.getElementById(id);
            if (cell) {
                cell.classList.add('found');
            }
        }
    });
})();