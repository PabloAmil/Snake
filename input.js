let inputDirection = {
    x: 0,
    y: 0
} // establece las cordenadas de movimiento

let lastInputDirection = { x: 0, y: 0 }


window.addEventListener('keydown', e => { // pasa el evento como parametro de un callback
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break // esto dice: si nos estamos moviendo hacia arriba o hacia abajo ignorar los inputs de arriba y abajo
            inputDirection = {
                x: 0,
                y: -1
            } // modifica el input direction que va a ser devuelto
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = {
                x: 0,
                y: 1
            }
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            inputDirection = {
                x: -1,
                y: 0
            }
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = {
                x: 1,
                y: 0
            }
            break
    }
})

export function getInputDirection() {

    lastInputDirection = inputDirection
    return inputDirection // todo lo que hace es tomar esas cordenadas y devolverlas
}

