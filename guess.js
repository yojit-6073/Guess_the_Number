let randomNumber = ~~(Math.random()*100 + 1); //parseInt can also be used
console.log(randomNumber);

const numInput = document.querySelector('#guessField')
const submit = document.querySelector('#subt')
const guessArray = document.querySelector('.guesses')
const guessRemaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const mainDiv = document.querySelector('.resultParas')
const p = document.createElement('p')

let prevGuess = []
let numGuess = 10

let playGame = true

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault()
        const guess = numInput.value
        console.log(guess);
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }
    else if(guess < 1 && guess !== randomNumber){
        alert('Please enter a number larger than 1')
    }
    else if(guess > 100 && guess !== randomNumber){
        alert('Please enter a number smaller than 100')
    }
    else{
        prevGuess.push(guess)
        if(numGuess === 1){
            displayGuess(guess)
            displayMessage(`Tough Luck! You are out of guesses. The correct number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage('You guessed correct! GG')
        endGame()
    }
    else if(guess < randomNumber - 10){
        displayMessage('Guess is too LOW')
    }
    else if(guess > randomNumber + 10){
        displayMessage('Guess is too HIGH')
    }
    else{
        displayMessage('You are VERY CLOSE to success')
    }

}

function displayGuess(guess){
    numInput.innerHTML = ''
    guessArray.innerHTML += `${guess},  `;
    numGuess--
    guessRemaining.innerHTML = `${numGuess}`       
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`    
}

function endGame(guess){
    numInput.innerHTML = ''
    numInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newStart">Click here to start a new game</h2>`
    mainDiv.appendChild(p)
    playGame = false
    newGame()
}

function newGame(guess){
    const newGameButton = document.querySelector('#newStart')
    newGameButton.addEventListener('click',(e)=>{
        randomNumber = parseInt(Math.random()*100 + 1)
        prevGuess = []
        numGuess = 10
        guessArray.innerHTML = ''
        numInput.removeAttribute('disabled')
        mainDiv.removeChild(p)
        guessRemaining.innerHTML = `${numGuess}`

        playGame = true
    })
}