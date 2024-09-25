var app = angular.module("MegaGuess", []);

app.controller("GameController", ['$scope', function($scope) {
    $scope.title = "Mega Guess Game";
    var words = [
        { name: "harimau", desc: "Karnivora, serem tapi imut" },
        { name: "zebra", desc: "Herbivora, memiliki badan yang unik" },
        { name: "kanguru", desc: "Herbivora, bisa lompat tinggi" },
        { name: "anjing", desc: "Omnivora, hewan lucu amayy" },
        { name: "hamster", desc: "Omnivora, hobinya ngegym" },
        { name: "cheetah", desc: "Karnivora, larinya cepet banget" },
        { name: "kupu-kupu", desc: "Herbivora, berawal dari sosok menjijikan" },
        { name: "kadal", desc: "Omnivora, suka ngumpet di rumput" },
        { name: "burung hantu", desc: "Karnivora, kepalanya muter anjay" },
        { name: "rubah", desc: "Omnivora, suaranya sudah ditiru" },
        { name: "platypus", desc: "Karnivora, kukunya beracun" },
        { name: "kambing", desc: "Herbivora, memiliki suara yang khas" },
        { name: "landak", desc: "Herbivora, punya counter attack" },
        { name: "bison", desc: "Herbivora, merk motor" },
        { name: "kijang", desc: "Herbivora, merk mobil" },
        { name: "penguin", desc: "Karnivora, hobi nya bkin gang" },
        { name: "tomcat", desc: "Herbivora, serangga sekali gigit mengegerkan" },
        { name: "sugarglider", desc: "Omnivora, hewan peliharaan gemoy banget bisa loncat2" },
        { name: "hiu", desc: "Karnivora, kalo muncul dipantai mengegerkan" },
        { name: "paus", desc: "Omnivora, bisa nyembur" },
        { name: "simpanse", desc: "Omnivora, kembaran fawwaz" },
        { name: "komodo", desc: "Karnivora, cuman ada diindonesia" },
        { name: "beruang", desc: "Karnivora, hobinya ikan badan gede" }
    ];

    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];

    $scope.guesses = 8;
    $scope.displayWord = "";
    $scope.displayDesc = "";
    $scope.input = {
        letter: ""
    };

    var selectedRandomWord = function() {
        var index = Math.floor(Math.random() * words.length);
        return words[index];
    };

    var newGame = function() {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 8;
        $scope.displayWord = "";

        selectedWord = selectedRandomWord();
        var tempDisplayWord = "";
        for (let i = 0; i < selectedWord.name.length; i++) {
            tempDisplayWord += "*";
        }
        $scope.displayWord = tempDisplayWord;
        $scope.displayDesc = selectedWord.desc;
    };

    var removeWord = function(word) {
        var index = words.findIndex(item => item.name === word.name);
        if (index > -1) {
            words.splice(index, 1);
        }
    };

    var checkGameCompletion = function() {
        if (words.length === 0) {
            alert("Congratulations! You have completed the game!");
        }
    };

    $scope.letterChosen = function() {
        var correct = false;
        var inputLetters = $scope.input.letter.toLowerCase();

        // Check if the input was already chosen
        if ($scope.incorrectLettersChosen.includes(inputLetters) || 
            $scope.correctLettersChosen.includes(inputLetters)) {
            $scope.input.letter = "";
            alert("This combination has already been chosen");
            return;
        }

        // Update the displayWord based on the inputLetters
        for (let i = 0; i <= selectedWord.name.length - inputLetters.length; i++) {
            if (selectedWord.name.substr(i, inputLetters.length).toLowerCase() === inputLetters) {
                $scope.displayWord = $scope.displayWord.substring(0, i) +
                                    inputLetters +
                                    $scope.displayWord.substring(i + inputLetters.length);
                correct = true;
            }
        }

        // Add the input to the correct or incorrect list
        if (correct) {
            $scope.correctLettersChosen.push(inputLetters);
            if ($scope.displayWord.indexOf("*") === -1) {
                alert("YOU WON!");
                removeWord(selectedWord);
                checkGameCompletion();
                if (words.length > 0) {
                    newGame();
                }
            }
        } else {
            $scope.incorrectLettersChosen.push(inputLetters);
            $scope.guesses--;  // Decrement guesses if the guess is incorrect
        }

        $scope.input.letter = "";
        if ($scope.guesses === 0) {
            alert("YOU LOSE! The word is " + selectedWord.name);
            newGame();
        }
    };

    newGame();
}]);