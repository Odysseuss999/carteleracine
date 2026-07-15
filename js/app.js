const contenedorPeliculas = document.getElementById("contenedorPeliculas");
const buscador = document.getElementById("buscar");
const botones = document.querySelectorAll(".categorias button");
const btnMostrar = document.getElementById("btnMostrar");
const ordenar = document.getElementById("ordenar");
const contador = document.getElementById("contador");

const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");

const modalImagen = document.getElementById("modalImagen");
const modalTitulo = document.getElementById("modalTitulo");
const modalGenero = document.getElementById("modalGenero");
const modalDuracion = document.getElementById("modalDuracion");
const modalClasificacion = document.getElementById("modalClasificacion");
const modalEstreno = document.getElementById("modalEstreno");
const modalSinopsis = document.getElementById("modalSinopsis");

let peliculas = [];
let peliculasFiltradas = [];
let peliculasVisibles = 8;

// Obtener películas desde PHP
const cargarPeliculas = async () => {

    const respuesta = await fetch("php/obtenerPeliculas.php");

    peliculas = await respuesta.json();

    peliculasFiltradas = [...peliculas];

    mostrarPeliculas();

};

// Mostrar películas
const mostrarPeliculas = () => {

    contenedorPeliculas.innerHTML = peliculasFiltradas
        .slice(0, peliculasVisibles)
        .map(pelicula => `

        <div class="tarjeta">

            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">

            <h2>${pelicula.titulo}</h2>

            <p><strong>Género:</strong> ${pelicula.genero}</p>

            <p><strong>Duración:</strong> ${pelicula.duracion} min</p>

            <p><strong>Clasificación:</strong> ${pelicula.clasificacion}</p>

            <p><strong>Estreno:</strong> ${pelicula.estreno}</p>

            <button data-id="${pelicula.id}">
                Ver detalles
            </button>

        </div>

    `).join("");

    // Contador usando reduce()
    const total = peliculasFiltradas.reduce(
        (acumulador) => acumulador + 1,
        0
    );

    contador.textContent = `Películas encontradas: ${total}`;

};

// Buscar
buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    peliculasFiltradas = peliculas.filter(pelicula =>
        pelicula.titulo.toLowerCase().includes(texto)
    );

    peliculasVisibles = 8;

    mostrarPeliculas();

});

// Filtrar por género
botones.forEach(boton => {

    boton.addEventListener("click", () => {

        const genero = boton.dataset.genero;

        peliculasFiltradas = genero === "Todas"
            ? [...peliculas]
            : peliculas.filter(
                pelicula => pelicula.genero === genero
            );

        peliculasVisibles = 8;

        mostrarPeliculas();

    });

});

// Mostrar más
btnMostrar.addEventListener("click", () => {

    peliculasVisibles += 8;

    mostrarPeliculas();

});

// Ordenar
ordenar.addEventListener("change", () => {

    switch (ordenar.value) {

        case "az":

            peliculasFiltradas.sort((a, b) =>
                a.titulo.localeCompare(b.titulo)
            );

            break;

        case "za":

            peliculasFiltradas.sort((a, b) =>
                b.titulo.localeCompare(a.titulo)
            );

            break;

        case "nuevo":

            peliculasFiltradas.sort((a, b) =>
                b.estreno - a.estreno
            );

            break;

        case "viejo":

            peliculasFiltradas.sort((a, b) =>
                a.estreno - b.estreno
            );

            break;

    }

    mostrarPeliculas();

});

// Abrir modal usando find()
contenedorPeliculas.addEventListener("click", (e) => {

    if (e.target.tagName === "BUTTON") {

        const id = Number(e.target.dataset.id);

        const pelicula = peliculas.find(
            p => Number(p.id) === id
        );

        modalImagen.src = pelicula.imagen;
        modalTitulo.textContent = pelicula.titulo;
        modalGenero.textContent = "Género: " + pelicula.genero;
        modalDuracion.textContent = "Duración: " + pelicula.duracion + " min";
        modalClasificacion.textContent = "Clasificación: " + pelicula.clasificacion;
        modalEstreno.textContent = "Estreno: " + pelicula.estreno;
        modalSinopsis.textContent = pelicula.sinopsis;

        modal.style.display = "flex";

    }

});

// Cerrar modal
cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

});

// Cerrar al hacer clic fuera del modal
modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// Iniciar aplicación
cargarPeliculas();