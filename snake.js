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
    }
    update() {
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
        }
    }
    draw() {
        this.game.ctx.fillStyle = this.color
        this.game.ctx.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.width,this.height)
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
    }
}