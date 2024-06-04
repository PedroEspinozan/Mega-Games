import { getJuegos } from "./getJuegos.js";

const enviarDatos = (id, nombre, genero, precio, foto) => {

	const rutaArchivoHTML = "assets/sitio/jueguito.html";

	fetch(rutaArchivoHTML)
		.then(response => response.text())
		.then( (html) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const juegoFoto = doc.getElementById('foto');
			juegoFoto.src = foto;

			const juegoNombre = doc.getElementById('nombre');
			juegoNombre.textContent = `Nombre: ${nombre}`;

			const juegoGenero = doc.getElementById('genero');
			juegoGenero.textContent = `Genero : ${genero}`;

			const juegoPrecio = doc.getElementById('precio');
			juegoPrecio.textContent = `Precio : ${precio}`;

			const nuevoHTML = new XMLSerializer().serializeToString(doc);
			document.body.innerHTML = nuevoHTML; // inyectar html de personaje.html al index.html para "mostrarlo por encima"
		})
		.catch((error) => {
			console.log(`El error es: ${error}`);
		})
	
}

const crearCard = (results = []) => {
	let juegosRow = document.getElementById("juegosRow");

	results.map( (result) => {
		
        const { id, nombre, genero, precio, foto} = result;
		
		const divCol = document.createElement("div");
		divCol.classList.add("col-xl-3");
		divCol.classList.add("col-lg-3");
		divCol.classList.add("col-md-3");
		divCol.classList.add("col-sm-12");
		divCol.classList.add("col-xs-12");
		divCol.classList.add("mt-2");
		divCol.classList.add("mb-2");

		const card = document.createElement("div");
		card.classList.add("card");

		const image = document.createElement("img");
        image.src = foto;
        image.alt = `Imagen de: ${nombre}`;
        image.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = nombre;

        const titleGenero = document.createElement("p");
        titleGenero.classList.add("card-text");
        titleGenero.textContent = `Genero: ${genero}`;

		const titlePrecio = document.createElement("p");
        titlePrecio.classList.add("card-text");
        titlePrecio.textContent = `Precio: ${precio}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn");
        btnVer.classList.add("btn-warning");
        btnVer.textContent = "Ver detalles";
        btnVer.addEventListener("click",()=> {
            enviarDatos(id, nombre, genero, precio, foto);
        });

		divCol.append(card);

		card.appendChild(image);
		card.appendChild(divBody);

		divBody.appendChild(title);
		divBody.appendChild(titleGenero);
		divBody.appendChild(titlePrecio);
		divBody.appendChild(btnVer);

		juegosRow.appendChild(divCol);
	});
}

getJuegos()
	.then( (data) => {
		crearCard(data);
		console.log(data);
	})
	.catch( (error) => {
		console.log(`El error es: ${error}`);
	})