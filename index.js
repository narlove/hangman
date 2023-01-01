const { data } = require('./words.json');
const prompt = require('prompt-sync')( { sigint: true });

// choosing a random word

let chosenWord;
let wordArray;

let devCodeUsed = false;
const devCodeAmount = 10;

const letters = 'abcdefghijklmnopqrstuvwxyz';

const maxChances = 8;
let chances = maxChances;

let totalScore = 0;

while (true) {
    chances = maxChances
    let guessedLetters = [];
    let revealedLetters = [];

    const randomIndex = Math.floor(Math.random() * data.length);
    chosenWord = data[randomIndex];
    
    wordArray = [];
    for (const letter of chosenWord) {
        wordArray.push(letter);
    }

    devCodeUsed = false;
    
    while (chances > 0) {
        // having the user input suggestions
    
        let underscores = '';
    
        wordArray.forEach(letter => {
            if (revealedLetters.includes(letter)) {
                underscores += letter;
                return;
            } else {
                underscores += '_';
            }
        })
    
        console.log('Your word is: \n' + underscores + `\nYou have ${chances} chances left.`);
        (guessedLetters.length !== 0) ? console.log(`You have already guessed: ${guessedLetters}`) : null
    
        const attempt = prompt("Please enter a letter to guess: ").toLowerCase();
    
        process.stdout.write('\033c'); // clear the console
        
        if (attempt === "dev code: #welcometo2023") {
            if (devCodeUsed) {
                console.log('You can only use that once per round!');
            } else {
                chances += devCodeAmount;
                devCodeUsed = true;
            }
        }

        if (attempt.length !== 1 || !letters.includes(attempt)) { 
            console.log('Please enter a valid character (any letter between a-z)');
            continue;
        }
        
        const existingGuess = guessedLetters.includes(attempt);
        
        if (existingGuess) {
            console.log('You have already guessed that letter! Please choose another letter between a-z');
            continue;
        }
        
        guessedLetters.push(attempt);
        
        if (chosenWord.includes(attempt)) {
            console.log(`The letter ${attempt} is included in the word!`);
            revealedLetters.push(attempt);
            const allLettersRevealed = wordArray.every(letter => {
                return revealedLetters.includes(letter);
            });
            if (allLettersRevealed) {
                break; // while loop exit
            }
            
        } else {
            console.log(`The letter ${attempt} is not included in the word!`);
            chances -= 1;
        }
    }

    // revealing the word

    if (chances > 0) {
        if (devCodeUsed) {
            chances -= devCodeAmount;
            chances = Math.max(chances, 0);
        }

        console.log(`Congratulations! You have successfully found uncovered the word: ${chosenWord}.
You uncovered the word with ${chances} chances remaining.`);
        totalScore += chances;
        console.log(`Your total score is now: ${totalScore}`);
    } else {
        console.log(`You ran out of chances! The word was: ${chosenWord}`);
        console.log(`You finished the game with a total score of ${totalScore}!`);
        break;
    }
}