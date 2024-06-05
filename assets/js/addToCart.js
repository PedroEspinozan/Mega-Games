export const addToCart = (id, nombre, precio, foto) => {

    const juego = { "id":id, "nombre":nombre, "precio":precio, "foto":foto, "cantidad": 1 }

    if(localStorage.getItem("carritoGuardado") !== null) {
        const carrito = JSON.parse(localStorage.getItem("carritoGuardado"))
        console.log(carrito)
        carrito.push(juego)

        localStorage.setItem("carritoGuardado", JSON.stringify(carrito))
    } else {
        localStorage.setItem("carritoGuardado", JSON.stringify([juego]))
    }

    alert("Juego añadido al carrito.");
}