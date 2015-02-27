/**************************************************************************
 * Source File Name: slotmachine
 * Original Template Author: Tom Tsiliopoulos
 * Last Modified By: October 1st, 2014
 * Date Last Modified: October 1st, 2014
 * Program Description: Browser Based Slot Machine Template.
 **************************************************************************/

var Button = (function () {
    function Button(path, x, y) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }
    // Public Properties
    Button.prototype.setX = function (x) {
        this._x = x;
    };

    Button.prototype.getX = function () {
        return this._x;
    };

    Button.prototype.setY = function (y) {
        this._y = y;
    };

    Button.prototype.getY = function () {
        return this._y;
    };

    Button.prototype.getImage = function () {
        return this._image;
    };

   //Private Event Handlers
    Button.prototype._buttonOut = function (event) {
        event.currentTarget.alpha = 1; // 100% Alpha
    };

    Button.prototype._buttonOver = function (event) {
        event.currentTarget.alpha = 0.5;
    };
    return Button;
})();

// Variables
var canvas;
var stage;
var tiles = [];
var reelContainers = [];

// Game Constants
var NUM_REELS = 3;

var playerMoney = 1000;
var jackpot = 5000;
var betAmount = 0;
var spinResult;
var fruits = "";
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var watermelon = 0;
var playerMoneyText;
var betAmountText;
var jackpotAmountText;

//Game Objects
var game;
var background;
var spinButton;
var betMaxButton;
var betOneButton;
var resetButton;
var quitButton;

//Functions
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// Game Loop
function gameLoop() {
    stage.update();
}

//resets the FruitTally making it so the player doesn't contniously win because of previous fruits still counting.
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    watermelon = 0;
}

//Utility function to check if a value falls within a range of bounds 
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

// When this function is called it determines the betLine results.
// Determines if the player has won.
// Determines how much money the player has won.
// Allows for Jackpot win, if combination is correct.
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "Watermelon";
                watermelon++;
                if (watermelon == 3) {
                        playerMoney = playerMoney += betAmount * 5;
                        playerMoneyText.text = "Money " + playerMoney.toString();
                    }
                if (watermelon == 2) {
                        playerMoney = playerMoney += betAmount * 1;
                        playerMoneyText.text = "Money " + playerMoney.toString();
                    }
                if (watermelon == 1) {
                        playerMoney = playerMoney += betAmount * 0;
                        playerMoneyText.text = "Money " + playerMoney.toString();
                    }
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                if (grapes == 3){
                playerMoney = playerMoney += betAmount * 10;
                playerMoneyText.text = "Money " + playerMoney.toString();
                }
                if (grapes == 2) {
                    playerMoney = playerMoney += betAmount * 2;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                if (grapes == 1) {
                    playerMoney = playerMoney += betAmount * 0;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                if (bananas == 3) {
                    playerMoney = playerMoney += betAmount * 20;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                
                else if (bananas == 2) {
                    playerMoney = playerMoney += betAmount * 2;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                else if (bananas == 1) {
                    playerMoney = playerMoney += betAmount * 0;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                if (oranges == 3) {
                    playerMoney = playerMoney += betAmount * 30;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }

                else if (oranges == 2) {
                    playerMoney = playerMoney += betAmount * 3;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                else if (oranges == 1) {
                    playerMoney = playerMoney += betAmount * 0;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                if (cherries == 3) {
                    playerMoney = playerMoney += betAmount * 40;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }

                else if (cherries == 2) {
                    playerMoney = playerMoney += betAmount * 4;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                else if (cherries == 1) {
                    playerMoney = playerMoney += betAmount * 0;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                if (bars == 3) {
                    alert("You Won the $" + jackpot + " Jackpot!!");
                    playerMoney = playerMoney += jackpot;
                    jackpot = 1000;
                    playerMoneyText.text = "Money: " + playerMoney.toString();

                    jackpotAmountText.text = "Current Jackpot: " + jackpot.toString();
                }
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                if (bells == 3) {
                    playerMoney = playerMoney += betAmount * 75;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }

                else if (bells == 2) {
                    playerMoney = playerMoney += betAmount * 10;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                else if (bells == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                if (sevens == 3) {
                    playerMoney = playerMoney += betAmount * 100;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }

                else if (sevens == 2) {
                    playerMoney = playerMoney += betAmount * 20;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                else if (sevens == 1) {
                    playerMoney = playerMoney += betAmount * 5;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                }
                break;
        }
    }
    return betLine;
}

// Spin Button Click Event
// Confirms if player has bet money.
function spinButtonClicked(event) {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
    }

    //Informs player they have run out of money, resets game.
    if (playerMoney <= 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            
        }
        resetButtonClicked();
    }
    // Informs player they have not bet money.
    else if (betAmount == 0)
    {    
        alert("You didn't bet anything ");
    }
    betAmount -= betAmount;
    betAmountText.text = "Bet Amount: " + betAmount.toString();

    //readds reels to slot machine for use of game after reset.
    game.addChild(reelContainers[0]);
    game.addChild(reelContainers[1]);
    game.addChild(reelContainers[2]);
}

//Bet $1 Button Click Event.
//Causes Bet Amount to rise by 1 and player money to decline by 1.
function betOneButtonClicked() {
    if (betAmount < 1000) {
        playerMoney -= 1;
        betAmount += 1;
        playerMoneyText.text = "Money: " + playerMoney.toString();
        betAmountText.text = "Bet Amount: " + betAmount.toString();
    }
}

//betMaxButton Click Event
//Allows user to bet in $100 increments
function betMaxButtonClicked() {
    if (betAmount < 1000) {
        playerMoney -= 100;
        betAmount += 100;
        playerMoneyText.text = "Money: " + playerMoney.toString();
        betAmountText.text = "Bet Amount: " + betAmount.toString();
    }
    //resets fruit count, so they do not continously win because of previous fruits.
    resetFruitTally();
    //removes reels from slot machine -- reason forgotten.
    game.removeChild(reelContainers[0]);
    game.removeChild(reelContainers[1]);
    game.removeChild(reelContainers[2]);
}

//resets game to default settings.
function resetButtonClicked() {
    playerMoney = 1000;
    betAmount = 0;
    jackpot = 5000;
    playerMoneyText.text = "Money: " + playerMoney.toString();
    betAmountText.text = "Bet Amount: " + betAmount.toString();

    //removes reels from slot machine in order to start fresh.
    game.removeChild(reelContainers[0]);
    game.removeChild(reelContainers[1]);
    game.removeChild(reelContainers[2]);
}

//Allows player to quit game and be taken to a blank page.
function quitButtonClicked()
{
    alert("Do you want to quit the game? You will be moved to a blank page.");
    quitGame();
}

//Reference to the about:home page that the user goes to when quitting the game.
function quitGame()
{
    window.location.replace("about:home");
}

function createUI() {
    background = new createjs.Bitmap("assets/images/SlotMachine.png");
    game.addChild(background); // Add the background to the game container

    //places the playerMoneyText inside the designated box with its current value.
    playerMoneyText = new createjs.Text("Money: " + playerMoney.toString(), "Arial", "#000000");
    playerMoneyText.x = 57;
    playerMoneyText.y = 593;
    game.addChild(playerMoneyText);

    //places the betAmountText inside the designated box with its current value.
    betAmountText = new createjs.Text("Bet Amount: " + betAmount.toString(), "Arial", "#000000");
    betAmountText.x = 213;
    betAmountText.y = 593;
    game.addChild(betAmountText);
   
    //places the jackpotText inside the designated box with its current value.
    jackpotAmountText = new createjs.Text("Current Jackpot: " + jackpot.toString(), "Arial", "#000000");
    jackpotAmountText.x = 372;
    jackpotAmountText.y = 593;
    game.addChild(jackpotAmountText);

    //displays the reels for the game using the images available to cycle through.
    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 88;
    reelContainers[0].y = 270;
    reelContainers[1].x = 242;
    reelContainers[1].y = 270;
    reelContainers[2].x = 393;
    reelContainers[2].y = 270;

    // Spin Button
    spinButton = new Button("assets/images/SpinButton.png", 450, 450);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/BetMax.png", 393.5, 455);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked);

    // Bet One Button
    betOneButton = new Button("assets/images/BetOne.png", 340, 455);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", betOneButtonClicked);

    // Reset Button
    resetButton = new Button("assets/images/ResetButton.png", 115, 455);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Quit Button
    quitButton = new Button("assets/images/QuitButton.png", 55, 455);
    game.addChild(quitButton.getImage());
    quitButton.getImage().addEventListener("click", quitButtonClicked);
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI(); //creates the UI for the game.

    stage.addChild(game); // Adds the Game Container to the Stage
}