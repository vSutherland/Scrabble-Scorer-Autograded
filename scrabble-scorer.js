const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function initialPrompt() {
  console.log("Let's play some Scrabble! Enter a word:");
  let word = input.question("Word: ");
  return word;
}

function simpleScorerFunction(word) {
  word = word.toUpperCase();
  return word.length;
}

function vowelBonusScorerFunction(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    if ('AEIOU'.includes(word[i])) {
      letterPoints += 3;
    } else {
      letterPoints += 1;
    }
  }
  return letterPoints;
}

function oldScrabbleScorerFunction(word) {
  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += parseInt(pointValue);
      }
    }
  }
  return letterPoints;
}

function transform(oldPointStructure) {
  const newPointStructure = {};

  for (const pointValue in oldPointStructure) {
    for (const letter of oldPointStructure[pointValue]) {
      newPointStructure[letter.toLowerCase()] = parseInt(pointValue);
    }
  }

  return newPointStructure;
}

const simpleScorer = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScorerFunction
};

const vowelBonusScorer = {
  name: "Vowel Bonus Score",
  description: "Vowels are worth 3 points, consonants are worth 1 point.",
  scorerFunction: vowelBonusScorerFunction
};

const scrabbleScorer = {
  name: "Scrabble Score",
  description: "The traditional scoring algorithm.",
  scorerFunction: oldScrabbleScorerFunction
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
  console.log("\nChoose a scoring algorithm:");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i + 1} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  let choice = input.question("Enter the number of your choice: ");
  choice = parseInt(choice) - 1;
  return scoringAlgorithms[choice];
}

function runProgram() {
  const word = initialPrompt();
  const selectedScorer = scorerPrompt();
  const score = selectedScorer.scorerFunction(word);
  console.log(`Score for '${word}' using ${selectedScorer.name}: ${score}`);
}

const newPointStructure = transform(oldPointStructure);

runProgram();

module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
