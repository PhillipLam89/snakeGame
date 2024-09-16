class Game {
    constructor(canvas, context) {
        this.canvas = canvas
        this.ctx = context 
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.snake = new Snake(this,0,0,1,0) //creates snake when game is created
        
        this.cellSize = 50
        this.columns = this.width / this.cellSize
        this.rows = this.height / this.cellSize


        window.onresize = (e) => { //must use arrow func for 'this'
          this.resize(e.currentTarget.innerWidth,e.currentTarget.innerHeight)
        }
    }
    resize(width, height) {
        this.canvas.width = ~~width
        this.canvas.height = ~~height
        this.width = this.canvas.width 
        this.height = this.canvas.height
       
        this.render()
    }

    drawGrid() {
        
    }
    render() {
       
        // this.snake.update()
        // this.snake.draw()
    }
}

window.onload = () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight

    const game = new Game(canvas, ctx)
   

    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.render()
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
}