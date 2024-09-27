class Ui {
    constructor(game) {
        this.game = game
        //displays the score
        this.scoreBoard1 = window.scoreBoard1
        this.scoreBoard2 = window.scoreBoard2
        this.scoreBoard3 = window.scoreBoard3
        this.allScoreBoards = [this.scoreBoard1, this.scoreBoard2, this.scoreBoard3]
        
        window.startButton.onclick = () => this.game.start()

        //controls
        this.player1Controls = window.player1Controls
        this.player2Controls = window.player2Controls
        this.player3Controls = window.player3Controls
    }
   
    update() {
        this.allScoreBoards.forEach((board,i) => {
            board.textContent = this.game.allPlayers[i].playerName + ': ' + this.game.gameObj[i].score
        })
    }
    
    gamePlayUi() {
        window.gameMenu.style.display = 'none'
        window.startButton.textContent = 'Restart'
    }
    gameOverUi() {
        window.gameMenu.style.display = 'block'
        window.startButton.textContent = 'Start'
    }
        
}