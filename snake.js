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
        this.moving = true
        this.score = 0
        this.maxSnakeLength = 5
        this.segments = []
    }
    update() {
        //check if snake ate the food
        if (this.game.checkCollision(this, this.game.food)) {
            this.game.food.reset() // if food is eaten, remove and move it to another random location
            this.score++
            this.maxSnakeLength++
        }

        //check for boundaries to stop snake from moving
        if (this.x <= 0 && this.speedX < 0
                ||
            this.x >= this.game.columns - 1 && this.speedX > 0
                ||
            this.y <= 0 && this.speedY < 0
                ||
            this.y >= this.game.rows - 1 && this.speedY > 0
        ) {
            this.moving = false
           
        }
        if (this.moving) {
            this.x+= this.speedX
            this.y+= this.speedY
            this.segments.unshift({x:this.x, y:this.y})
            this.segments.length > this.maxSnakeLength 
            &&  this.segments.pop()
               
            
        }
    }
    draw() {
        this.segments.forEach((segment,i) => {
            if (i === 0) this.game.ctx.fillStyle = 'deeppink' //head of snake is deeppink
            else this.game.ctx.fillStyle = this.color
            this.game.ctx.fillRect(segment.x * this.game.cellSize,
                                    segment.y * this.game.cellSize,
                                    this.width,
                                    this.height)
        })

    }

    turnUp() {
        this.speedX = 0
        this.speedY = -1
        this.moving = true
    }
    turnDown() {
        this.speedX = 0
        this.speedY = 1
        this.moving = true
    }
    turnLeft() {
        this.speedX = -1
        this.speedY = 0
        this.moving = true
    }
    turnRight() {
        this.speedX = 1
        this.speedY = 0
        this.moving = true
    }
}

class KeyboardArrows extends Snake {
    constructor(game,x,y,speedX,speedY,color) {
        super(game,x,y,speedX,speedY,color)
        window.addEventListener('keydown', ({key}) => {
            if (key == 'ArrowUp') this.turnUp()
            else if (key == 'ArrowDown') this.turnDown()
            else if (key == 'ArrowLeft') this.turnLeft()
            else if (key == 'ArrowRight') this.turnRight()
        })
    }

}
class KeyboardWASD extends Snake {
    constructor(game,x,y,speedX,speedY,color) {
        super(game,x,y,speedX,speedY,color)
        window.addEventListener('keydown',({key}) => {
            if (key.toLowerCase() == 'w') this.turnUp()
                else if (key.toLowerCase() == 's') this.turnDown()
                else if (key.toLowerCase() == 'a') this.turnLeft()
                else if (key.toLowerCase() == 'd') this.turnRight()
        })

        }
    }

class ComputerAI extends Snake {
    constructor(game,x,y,speedX,speedY,color) {
        super(game,x,y,speedX,speedY,color)
        this.turnTimer = 0
        this.turnInterval  = ~~(Math.random() * this.game.columns - 1)  // snake will randomly change direction at random times that update is called
    }
    update() {
        super.update() //to check boundaries and increase speed

        if (this.turnTimer < this.turnInterval) {
            this.turnTimer++
        } else {
            this.turnTimer = 0
            this.turn()
            this.turnInterval  = ~~(Math.random() * this.game.rows - 1)
        }
    }
    turn() { //this is only for AI so it randomly turns
        if (!this.speedY) { // if snake hasnt been moving up/down, randomly make it either move up or down
            Math.random() < 0.5 ? this.turnUp() : this.turnDown()
        } else if (!this.speedX) {
            Math.random() < 0.5 ? this.turnLeft() : this.turnRight()
        }

    }
}