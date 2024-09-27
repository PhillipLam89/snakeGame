class Snake {
    constructor(game,x,y,speedX,speedY,color,playerName) {
        this.game = game
        this.x = x
        this.y = y
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
        this.playerName = playerName
        this.width = this.game.cellSize
        this.height = this.width //because square
        this.moving = true
        this.score = 0
        this.maxSnakeLength = 3
        this.segments = []
        this.readyToTurn = true
       
    }
    checkSnakeBodyCollision() {
        const bodyLocation = this.segments.slice(1)
        const headLocation = this.segments[0]
        
        if (this.segments.length > 3 &&
            bodyLocation.some(seg => 
            seg.x === headLocation.x 
            && seg.y === headLocation.y)) {
          
            this.score = this.score <= 3 ? 0 : this.score - 3
            this.segments = this.segments.slice(0, this.segments.length - 3)
            this.maxSnakeLength = 3
        }
    }
    update() {
        
        //check if snake ate the food
        this.readyToTurn = true //to prevent spam turning
        
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
            this.y <= this.game.topMargin && this.speedY < 0
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
            this.checkSnakeBodyCollision()
        }
        if (this.score >= this.game.winningScore) {
            this.game.gameOver = true
            this.game.gameUi.gameOverUi()
        }


    }
    draw() {
        
        this.segments.forEach((segment,i) => {
           
            if (!i) {
                this.game.ctx.fillStyle = 'purple'
               
            }   else {
                this.game.ctx.fillStyle = this.color
            } //head of snake is deeppink

            this.game.ctx.fillRect(segment.x * this.game.cellSize,
                                    segment.y * this.game.cellSize,
                                    this.width,
                                    this.height)
            this.game.ctx.fillStyle = 'white'                                                    
        })
 
        // this.game.ctx.font =  this.game.cellSize +'px' + ' Impact'
        this.game.ctx.fillText(this.score, this.segments[0].x  * this.game.cellSize, this.segments[0].y* this.game.cellSize, this.game.cellSize)
    }

    turnUp() {
        if (!this.speedY && this.y > this.game.topMargin && this.readyToTurn) { //only allow vertical movement if currently moving horizontally (to prevent snake from reversing on itself)
            this.speedX = 0
            this.speedY = -1
            this.moving = true
            this.readyToTurn = false
        }

    }
    turnDown() {
        if (!this.speedY && this.y < this.game.rows - 1 && this.readyToTurn) {
            this.speedX = 0
            this.speedY = 1
            this.moving = true
            this.readyToTurn = false
        }
    }
    turnLeft() {
        if (!this.speedX && this.x > 0 && this.readyToTurn) {
            this.speedX = -1
            this.speedY = 0
            this.moving = true
            this.readyToTurn = false
        }
    }
    turnRight() {
        if (!this.speedX && this.x < this.game.columns - 1 && this.readyToTurn) {
            this.speedX = 1
            this.speedY = 0
            this.moving = true
            this.readyToTurn = false
        }
    }
}

class KeyboardArrows extends Snake {
    constructor(game,x,y,speedX,speedY,color,playerName) {
        super(game,x,y,speedX,speedY,color,playerName)
        window.addEventListener('keydown', ({key}) => {
            if (key == 'ArrowUp') this.turnUp()
            else if (key == 'ArrowDown') this.turnDown()
            else if (key == 'ArrowLeft') this.turnLeft()
            else if (key == 'ArrowRight') this.turnRight()
        })
    }

}
class KeyboardWASD extends Snake {
    constructor(game,x,y,speedX,speedY,color,playerName) {
        super(game,x,y,speedX,speedY,color,playerName)
        window.addEventListener('keydown',({key}) => {
            if (key.toLowerCase() == 'w') this.turnUp()
                else if (key.toLowerCase() == 's') this.turnDown()
                else if (key.toLowerCase() == 'a') this.turnLeft()
                else if (key.toLowerCase() == 'd') this.turnRight()
        })

        }
    }

class ComputerAI extends Snake {
    constructor(game,x,y,speedX,speedY,color,playerName) {
        super(game,x,y,speedX,speedY,color,playerName)
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