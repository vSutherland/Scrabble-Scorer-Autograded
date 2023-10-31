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

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      }
    }
  }
  return letterPoints;
}

function initialPrompt() {
  console.log("Let's play some scrabble! Enter a word:");
}

function simpleScorer(word) {
  return word.length;
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }

  return score;
}

function scrabbleScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (newPointStructure[letter]) {
      score += newPointStructure[letter];
    }
  }

  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are worth 3 points, and consonants are worth 1 point.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "Uses the Scrabble scoring system.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  const selectedAlgorithm = input.question("Enter the number of the scoring algorithm: ");
  return scoringAlgorithms[selectedAlgorithm];
}

function transform() {
  newPointStructure = {};

  for (const [score, letters] of Object.entries(oldPointStructure)) {
    for (const letter of letters) {
      newPointStructure[letter.toLowerCase()] = Number(score);
    }
  }
}

function runProgram() {
  initialPrompt();
  transform();
  const word = input.question("Enter a word to score: ");
  const selectedAlgorithm = scorerPrompt();
  const score = selectedAlgorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

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
  scorerPrompt: scorerPrompt,
};
