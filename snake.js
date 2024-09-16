class Snake {
    constructor(game,x,y,speedX,speedY,color) {
        this.game = game
        this.x = x
        this.y = y
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
        this.width = this.game.cellSize
        this.height = this.width //because square
    }
    update() {
        this.x+= this.speedX
        this.y+= this.speedY
    }
    draw() {
        this.game.ctx.fillStyle = this.color
        this.game.ctx.fillRect(this.x * this.width, this.y * this.height, this.width,this.height)
    }
}