//Obcjets
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};

const game = {
    playerHand: "",
    aiHand: "",
};


const hands = [...document.querySelectorAll('.select img')];

const chooseHandImage = (event) => {
    game.playerHand = event.target.dataset.option;

    hands.forEach((hand) => {
        hand.style.boxShadow = ""
    })

    event.target.style.boxShadow = "0 0 0 4px yellow";
}

const aiChoice = () => {
    return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

const checkResult = (player, ai) => {
    if (player === ai) {
        return "draws";
    } else if ((player === "paper" && ai === "rock") || (player === "scissors" && ai === "paper") || (player === "rock" && ai === "scissors")) {
        return "winn";
    } else {
        return "loss";
    }
}

const publishResult = (result) => {
    const showWinner = document.querySelector('[data-summary="who-win"]');
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiHand;
    document.querySelector('.numbers span').textContent = ++gameSummary.numbers;

    if (result === "draws") {
        showWinner.textContent = "REMIS :/"
        showWinner.style.color = "grey";
        document.querySelector('.draws span').textContent = ++gameSummary.draws;

    } else if (result === "winn") {
        showWinner.textContent = "WYGRANA :)"
        showWinner.style.color = "green";
        document.querySelector('.wins span').textContent = ++gameSummary.wins;
    } else if (result === "loss") {
        showWinner.textContent = "PRZEGRANA :("
        showWinner.style.color = "red";
        document.querySelector('.losses span').textContent = ++gameSummary.losses
    }
};

const endGame = () => {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
}


// Root function
const startGame = () => {
    if (!game.playerHand) {
        alert('Nie dokonałeś zadnego wyboru');
        return;
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(gameResult);
    endGame();
};


//Event Listeners
hands.forEach((hand) => {
    hand.addEventListener('click', chooseHandImage)
});

document.querySelector('.start').addEventListener('click', startGame);