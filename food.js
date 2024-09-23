class Food {
    constructor(game) {
        this.game = game
        this.x = null
        this.y = null
        this.reset() //calling reset right when food is created will auto place it in a random location
    }
    reset() {
        this.x = ~~(Math.random() * this.game.columns)
        this.y = ~~(Math.random() * (this.game.rows-2) + 2)  //prevent food from spawning in top 2 areas (mushroom background)
    }
    draw() {
        this.game.ctx.fillStyle = 'white' //let food be white for now
        this.game.ctx.fillRect(this.x * this.game.cellSize,
                               this.y * this.game.cellSize,
                               this.game.cellSize,
                               this.game.cellSize)        
    }
    update() {}
}