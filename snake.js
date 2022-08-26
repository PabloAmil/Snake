import {
    getInputDirection
} from "./input.js" // importa la funcion

export let snakeSpeed = 11 // cuantas veces se mueve la serpiente por segundo


const snakeBody = [{
        x: 11,
        y: 11
    }
] // la serpiente es un array (con un objeto adentro) de posiciones x e y

let newSegments = 0;

export function update() { // para mover la serpiente cuadro por cuadro
    addSegments()
    const inputDirection = getInputDirection() // llama a "getInputDirection" y la asigna a una variable
    console.log(snakeBody.length - 2)

    for (let i = snakeBody.length - 2; i >= 0; i--) { // el -2 hace que nos de el anteultimo eslabon
        // snakeBody[i + 1] va a ser el elemento anterior al seleccionado (que seria el anteultimo) i + 1 va a ser el ultimo elemento
        snakeBody[i + 1] = {
            ...snakeBody[i]
        } // ese ultimo elemento va a ser igual al elemento actual que este recorriendo y lo va a poner en un nuevo objeto
    } // un ciclo por para recorrer todos los segmentos, excepto el ultimo, que va a desaparecer 

    snakeBody[0].x += inputDirection.x // toma los datos devueltos al llamar a la funcion y los asigna
    snakeBody[0].y += inputDirection.y
}


export function draw(gameBoard) { // para que aparezca tiene que pasarse el tablero como parametro en AMBAS. esta en el otro js se va a llamar "drawSnake", y tambien necesita que se pase el parametro 
    snakeBody.forEach(segment => { // loopea sobre ese objeto
        const snakeElement = document.createElement('div') // crea un elemento div que va a estar dentro del tablero en una coordenada x e y en particular
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake') // agrega la clase a los divs
        gameBoard.appendChild(snakeElement) // agrega los divs al tablero
    })
}

export function expandSnake(amount) { // tomo un numero para saber cuanto se expande

    newSegments += amount // lo utiliza para agregar y actualizar newSegments
}

export function onSnake(position, {ingnoreHead = false} = {}) { // sirve para determinar si la posicion pasada como parametro esta dentro cualquiera de los segmentos de la serpiente
    return snakeBody.some((segment, index) => { 
        if (ingnoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return  pos1.x === pos2.x && pos1.y === pos2.y // si estas 2 posiciones son exactamente iguales, equalPositions va a retornar true
    
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length-1]}) // toma el ultimo elemento de la serpiente y lo pushea, duplicandolo sobre el final de la serpiente
    }
    newSegments = 0 // con esto no agrega mas elementos que lo que dice el numero que se le dijo
}

export function getSnakeHead() {
    return snakeBody[0] // retorna el primer elemento del cuerpo de la serpiente, la cabeza
}

export function snakeIntersection() { // para checkear si la cabeza de la serpiente esta tocando cualquier otra parte de su cuerpo
    return onSnake(snakeBody[0], {ingnoreHead: true})
}

