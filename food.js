import { onSnake, expandSnake} from './snake.js'
export { gridSize }

const gridSize = 21
let food = getRandomFoodPosition ()           //    getRandomFoodPosition() // nota, en css grid empieza desde el 1, no desde el 0

const expansionRate = 1 // es lo que va a crecer la serpiente por cada pieza de comida

export function update() { 
    if (onSnake(food)) { // onSnake va  checkear si las posiciones se sobreponen
        expandSnake(expansionRate) // expande la serpiente en 1
        food = getRandomFoodPosition()
    }
}


export function draw(gameBoard) { // utiliza una funcion draw casi igual a la de la serpiente
    
        const foodElement = document.createElement('div') // crea un elemento div que va a estar dentro del tablero en una coordenada x e y en particular
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food') // agrega la clase a los divs
        gameBoard.appendChild(foodElement) // agrega los divs al tablero
}


function getRandomFoodPosition() { // cada vez que se ejecuta da una nueva posicion para la fruta, pero si esa posicion ya esta en la serpiente, va a buscar otra
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) { // para crear fruta que NO este en la serpiente. cuando el valor es null o si ya esta en la serpiente
        newFoodPosition = randomGridPosition() // para dar un valor x e y random dentro de la grilla
    }
    return newFoodPosition
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1,
    }
}




