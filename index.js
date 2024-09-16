class Game {
    constructor(canvas, context) {
        this.canvas = canvas
        this.ctx = context 
        this.width = this.canvas.width
        this.height = this.canvas.height
       
        this.cellSize = 50
        this.columns = null
        this.rows = null

        this.eventTimer = 0
        this.eventInterval = 1200
        this.updateEvent = false

        this.snake = new Snake(this,0,0,1,0,'magenta') //creates snake when game is created
        this.resize(innerWidth,innerHeight)
        window.onresize = (e) => { //must use arrow func for 'this'
          this.resize(e.currentTarget.innerWidth,e.currentTarget.innerHeight)
        }
    }
    resize(width, height) {
        this.canvas.width = ~~width - width % this.cellSize
        this.canvas.height = ~~height - height % this.cellSize
        this.width = this.canvas.width 
        this.height = this.canvas.height
        this.columns = ~~(this.width / this.cellSize)
        this.rows = ~~(this.height / this.cellSize)
  
    }

    drawGrid() {
        let currentRow = 0 
        while(currentRow < this.rows) {
            for (let x = 0; x < this.columns; x++) {
                    this.ctx.strokeRect(x*this.cellSize, currentRow*this.cellSize,
                    this.cellSize, this.cellSize)
            }
            currentRow++
        }
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
        if (this.updateEvent) {
            this.ctx.clearRect(0,0,this.width, this.height)
            this.drawGrid()
            this.snake.update()
            this.snake.draw()
        }

    }
}

window.onload = () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight

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