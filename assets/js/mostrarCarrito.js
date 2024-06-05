export const mostrarCarrito = () => {
    console.log("hola soy el carrito");

    const carritoRow = document.getElementById("carritoRow")
    carritoRow.innerHTML = '';

    if(localStorage.getItem("carritoGuardado") !== null) {
        const carritoGuardado = JSON.parse(localStorage.getItem("carritoGuardado"));
        let precioTotal = 0;
        
        const titulo = document.createElement("h3");
        titulo.classList.add("fw-bold", "text-light");
        titulo.textContent = "Tu Carrito";

        carritoGuardado.map((jueguitos) => {
            const { id, nombre, precio, foto } = jueguitos; 

            const divFoto = document.createElement("div");
            divFoto.classList.add("col-xl-6", "col-lg-6","col-md-6", "col-sm-12", "col-xs-12");

            const juegoFoto = document.createElement("img");
            juegoFoto.setAttribute("src", foto)
            juegoFoto.classList.add("w-25");

            divFoto.append(juegoFoto);

            const divDatos = document.createElement("div");
            divDatos.classList.add("col-xl-6", "col-lg-6", "col-md-6", "col-sm-12", "col-xs-12", "text-light");
            
            const juegoNombre = document.createElement("p");
            juegoNombre.textContent = nombre;

            const juegoPrecio = document.createElement("p")
            juegoPrecio.textContent = "$" + precio.toLocaleString();

            const btnQuitar = document.createElement("button");
            btnQuitar.textContent = "Quitar";
            btnQuitar.classList.add("btn", "btn-danger", "text-light");
            btnQuitar.addEventListener("click",() => {
                quitarDelCarrito(id);
                mostrarCarrito();
            })

            divDatos.appendChild(juegoNombre)
            divDatos.appendChild(juegoPrecio)
            divDatos.appendChild(btnQuitar)

            carritoRow.appendChild(divFoto);
            carritoRow.appendChild(divDatos);

            precioTotal += precio;
        })

        const precioDocumento = document.getElementById("precioTotal");
        precioDocumento.textContent = "Precio Total: $" + precioTotal.toLocaleString();

        document.getElementById("btnComprar").addEventListener('click', () => {
            if(precioTotal > 0) { alert(`Compra completa. Total a pagar: $${precioTotal}`); }
        })
    }
}

export const quitarDelCarrito = (idRemover) => {
    let carrito = JSON.parse(localStorage.getItem("carritoGuardado")) || [];
    carrito = carrito.filter(function(juego) { return juego.id != idRemover } );
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
    
    alert("Juego eliminado del carrito.");
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => { mostrarCarrito(); });