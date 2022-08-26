// gameloop

import { update as updateSnake, draw as drawSnake, snakeSpeed } from './snake.js' // no solo las importa, sino que con la palabra reservada "as" les puede cambiar el nombre
import { update as updateFood, draw as drawFood, gridSize } from './food.js'
import { getSnakeHead, snakeIntersection } from './snake.js'


const gameBoard = document.getElementById('game-board') // toma el tablero del documento y lo pone en una variable



let lastRenderTime = 0
let gameOver = false

function main(currentTime) { // para actualizar constantemente la posicion de la serpiente y la comida y calculos
    
    if (gameOver){
        if (confirm ('you lost. Press ok to restart')) { // confirm es un comando que viene en el buscador, como el alert pero tiene el boton de aceptar
            window.location = '/' // esto recarga la pagina
        }
    return 
    }


    window.requestAnimationFrame(main) // requestAnimationFrame reemplaza al setInterval, genera animaciones fluidas (que ademas se detienen en pestañas inactivas )
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 // currentTime es un contador por defecto del buscador (cuenta en milisegundos). la primera vez se le resta 0 (porque eso es lo que vale lastRenderTime) y se lo divide por 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return // si es menor a 1 / la velocidad de la serpiente. el 1 es la velocidad entre renderizados

    // console.log('render') se puede utilizar para ver las renderizaciones por segundo
    lastRenderTime = currentTime

    update() // casi todos los juegos estan divididos en estos 2 pasos, actualizar y dibujar nuevamente
    draw() // las funciones del archivo snake.js son llamadas aca a traves de las otras que las contienen
}

window.requestAnimationFrame(main) // se llama a la funcion una primera vez

function update() {   // a las funciones importadas se las llama desde estas
    updateSnake() 
    updateFood()
    checkDeath()
}

function draw() {

    gameBoard.innerHTML = '' // esto se encarga de borrar todo lo que estaba antes
    drawSnake(gameBoard)  // toma la variable del tablero creada y la pasa como parametro de la funcion, 
    drawFood(gameBoard)   // tambien tiene que tener el tablero de parametro
}


function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > gridSize || position.y < 1 || position.y > gridSize // checkea si la posicion de x o y esta por fuera de la grilla (siendo menor que 1 o mayor que 21, recordar que la grilla empieza desde el 1, no el 0)
    )
}



