
window.onload = (e) => {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    // canvas.width = innerWidth
    // canvas.height = innerHeight

    const game = new Game(canvas, ctx)
   
    let lastTime = 0

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        game.render(deltaTime)
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
}

class Game {
    constructor(canvas, context) {
        this.canvas = canvas
        this.ctx = context 
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gameOver = true

        this.topMargin = 2
        this.cellSize = 40
        this.columns = null
        this.rows = null
        this.gameObj = null
        this.food = null
        this.background = null

        this.eventTimer = 0
        this.eventInterval = 80
        this.updateEvent = false

        this.winningScore = 11
        this.gameUi = new Ui(this)

        this.resize(innerWidth,innerHeight)
        window.onresize = (e) => { //must use arrow func for 'this'
          this.resize(e.currentTarget.innerWidth,e.currentTarget.innerHeight)
        }
    }
    resize(width, height) {
        this.canvas.width = ~~width - width % this.cellSize
        // this.canvas.width = 200
        this.canvas.height = ~~height - height % this.cellSize
        // this.canvas.height = 200
        this.ctx.fillStyle = 'dodgerblue'
        this.ctx.font = '40px Impact'
        this.ctx.textBaseline = 'top'
        this.width = this.canvas.width 
        this.height = this.canvas.height
        this.columns = ~~(this.width / this.cellSize)
        this.rows = ~~(this.height / this.cellSize)
        this.background = new Background(this)

    }
    start() {
        if (!this.gameOver) {
            this.gameOver = true
            this.gameUi.gameOverUi()
        } else {
            this.gameOver = false
            this.gameUi.gamePlayUi()
            this.player1 = new KeyboardArrows(this,0,this.topMargin,0,0,'blue','phillip') //creates snake when game is created
            this.player2 = new KeyboardWASD(this,this.columns-1,this.rows-1,0,0,'red','human2') //creates snake when game is created
            this.player3 = new ComputerAI(this,0,this.rows-1,1,0,'black','computer')
            this.food = new Food(this)
            this.gameObj = [this.player1, this.player2, this.player3, this.food]
        }

    }
    drawGrid() {
        let currentRow = 0 
        this.ctx.strokeStyle = 'goldenrod'
        while(currentRow < this.rows) {
            for (let x = 0; x < this.columns; x++) {
                    this.ctx.strokeRect(x*this.cellSize, currentRow*this.cellSize,
                    this.cellSize, this.cellSize)
            }
            currentRow++
        }
    }
    drawStatusText() {

    }
    checkCollision(a,b) {
        return a.x == b.x && a.y == b.y
    }
    handlePeriodicEvent(deltaTime) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer+= deltaTime
            this.updateEvent = false
        } else {
            this.eventTimer = 0
            this.updateEvent = true //we will only render every 200 ms
        }
    }
    render(deltaTime) {
        this.handlePeriodicEvent(deltaTime)
        if (this.updateEvent && !this.gameOver) {
            this.ctx.clearRect(0,0,this.width, this.height)
            this.background.draw()
            this.drawGrid()
            this.gameObj.forEach(snake => {
                snake.update()
                snake.draw()
                
            })
            this.gameUi.update()
        }


    }
}