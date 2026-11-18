// js/interfaz.js
// Funciones que interactúan con la página HTML.

import { datosLibros } from "./datos.js";
import { Libro } from "./libro.js";

const libros = datosLibros.map(datos => new Libro(datos));

console.log("El principito:", libros[0].esLargo(300));
console.log("Cien años de soledad:", libros[1].esLargo(300));

import {
    DIAS_RECIENTE,
    patronCodigo,
    buscarPorTexto,
    ordenar,
    AñadirLibro,
    EliminarLibro,
    listarTodos,
    filtrar,
    contarPorCategoria,
    estadisticas,
    fechaLegible,
    diasDesde,
    siguienteId
} from "./logica.js";


const NOMBRE_APP = "Biblioteca-AM-GP";

console.log(`${NOMBRE_APP}: ${libros.length} libros`);

console.table(libros);


// ==================================================
// 1. CREAR TARJETAS HTML
// ==================================================

function crearTarjeta(libro) {
    const tarjeta = document.createElement("article");

    tarjeta.classList.add("tarjeta");

    const nombre = document.createElement("h3");

    nombre.textContent = libro.titulo;

    const datos = document.createElement("p");

    datos.textContent =
        `Autor: ${libro.autor} | Género: ${libro.genero} | ` +
        `Tipo: ${libro.tipo} | Fecha de salida: ${libro.fechaSalida}`;

    const descripcion = document.createElement("p");

    descripcion.textContent = libro.descripcionTarjeta();

    const fecha = document.createElement("p");

    fecha.classList.add("fecha");

    fecha.textContent = libro.fechaTexto;

    if (libro.esLargo(300)) {
    const etiqueta = document.createElement("span");

    etiqueta.textContent = "Largo";

    etiqueta.classList.add("etiqueta-largo");

    tarjeta.append(etiqueta);
    }

    if (diasDesde(libro.fechaSalida) <= DIAS_RECIENTE) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(nombre, datos, descripcion, fecha);

    return tarjeta;
}


// ==================================================
// 2. PINTAR LIBROS EN LA PÁGINA
// ==================================================

function pintar(lista) {
    const listado = document.querySelector("#listado");

    const estadisticasHTML = document.querySelector("#estadisticas");

    listado.replaceChildren();

    if (lista.length === 0) {
        const mensaje = document.createElement("p");

        mensaje.classList.add("sin-resultados");

        mensaje.textContent = "No se encontraron libros.";

        listado.append(mensaje);

    } else {
        for (const libro of lista) {
            listado.append(crearTarjeta(libro));
        }
    }

    estadisticasHTML.textContent =
        `${lista.length} libro(s) encontrado(s)`;
}


// ==================================================
// 3. BÚSQUEDA, ORDENACIÓN Y ACTUALIZACIÓN
// ==================================================

const buscador = document.querySelector("#buscador");

let orden = {
    campo: "id",
    tipo: "numero",
    asc: true
};


// ==================================================
// 4. COOKIES: GUARDAR Y LEER
// ==================================================

function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;

    const texto = encodeURIComponent(valor);

    document.cookie =
        `${nombre}=${texto}; max-age=${segundos}; path=/`;
}


function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave, valor] = parte.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}


// ==================================================
// 5. ACTUALIZAR LA PÁGINA
// ==================================================

function actualizar() {
    const texto = buscador.value;

    // Filtrar
    let lista = buscarPorTexto(libros, texto);

    // Ordenar
    if (orden.campo) {
        lista = ordenar(
            lista,
            orden.campo,
            orden.tipo,
            orden.asc
        );
    }

    // Pintar los libros
    pintar(lista);

    // Pintar el resumen
    pintarResumen(lista.length);
}


// ==================================================
// 6. CAMBIAR ORDEN
// ==================================================

function cambiarOrden(campo, tipo) {
    if (orden.campo === campo) {
        orden.asc = !orden.asc;

    } else {
        orden = {
            campo,
            tipo,
            asc: true
        };
    }

    guardarCookie("orden", JSON.stringify(orden), 30);

    actualizar();
}


// ==================================================
// 7. PINTAR RESUMEN
// ==================================================

function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {
        resumen.textContent =
            `Mostrando ${mostrados} de ${libros.length} libros`;

    } else {
        const texto = document.querySelector("#buscador").value;

        resumen.textContent =
            `No hay libros que contengan «${texto}»`;
    }
}


// ==================================================
// 8. VALIDAR CAMPOS
// ==================================================

function validarCampo(campo, patron, salida) {
    campo.addEventListener("input", () => {

        if (campo.value.trim() === "") {
            salida.textContent = "";
            return;
        }

        if (patron.test(campo.value)) {
            salida.textContent = "✓ válido";
            salida.style.color = "green";

        } else {
            salida.textContent = "✗ no válido";
            salida.style.color = "red";
        }
    });
}


const codigoNuevo = document.querySelector("#codigoNuevo");

const okCodigo = document.querySelector("#okCodigo");

validarCampo(codigoNuevo, patronCodigo, okCodigo);


// ==================================================
// 9. FORMULARIO PARA AÑADIR LIBROS
// ==================================================

function anadirDesdeFormulario(evento) {
    evento.preventDefault();

    const aviso = document.querySelector("#avisoAnadir");

    const codigo = codigoNuevo.value.trim();

    // Validar código
    if (!patronCodigo.test(codigo)) {
        aviso.textContent =
            "El código no cumple el formato ABC-1234 " +
            "(tres letras mayúsculas, guion y cuatro dígitos).";

        aviso.style.color = "red";

        return;
    }

    const titulo =
        document.querySelector("#tituloNuevo").value.trim();

    const autor =
        document.querySelector("#autorNuevo").value.trim();

    const genero =
        document.querySelector("#generoNuevo").value.trim();

    const tipo =
        document.querySelector("#tipoNuevo").value.trim();

    const fechaSalida =
        document.querySelector("#fechaNuevo").value;

    const descripcion =
        document.querySelector("#descripcionNuevo").value.trim();


    // Comprobar campos obligatorios
    if (
        titulo === "" ||
        autor === "" ||
        genero === "" ||
        tipo === "" ||
        fechaSalida === ""
    ) {
        aviso.textContent =
            "Faltan datos obligatorios para añadir el libro.";

        aviso.style.color = "red";

        return;
    }


    // Crear nuevo libro
    const nuevoLibro = new Libro({
        id: siguienteId(libros),
        codigo,
        titulo,
        autor,
        genero,
        tipo,
        fechaSalida,
        descripcion
    });


    // Añadir libro
    if (AñadirLibro(libros, nuevoLibro)) {

        aviso.textContent =
            `Libro añadido: ${nuevoLibro.titulo}`;

        aviso.style.color = "green";

        evento.target.reset();

        okCodigo.textContent = "";

        actualizar();

    } else {

        aviso.textContent =
            "No se pudo añadir el libro (ID duplicado).";

        aviso.style.color = "red";
    }
}


// ==================================================
// 10. EVENTOS DE LA PÁGINA
// ==================================================

buscador.addEventListener("input", actualizar);


document
    .querySelector("#ordenNombre")
    .addEventListener("click", () => {

        cambiarOrden("titulo", "texto");

    });


document
    .querySelector("#ordenNumero")
    .addEventListener("click", () => {

        cambiarOrden("id", "numero");

    });


document
    .querySelector("#ordenFecha")
    .addEventListener("click", () => {

        orden = {
            campo: "fechaSalida",
            tipo: "fecha",
            asc: false
        };

        guardarCookie("orden", JSON.stringify(orden), 30);

        actualizar();

    });


document
    .querySelector("#formAnadir")
    .addEventListener("submit", anadirDesdeFormulario);


// ==================================================
// 11. RECUPERAR EL ÚLTIMO ORDEN GUARDADO
// ==================================================

const ordenGuardado = leerCookie("orden");

if (ordenGuardado) {
    try {
        orden = JSON.parse(ordenGuardado);

    } catch (error) {
        console.warn(
            "Cookie 'orden' con formato no válido:",
            error.message
        );
    }
}


// Mostrar libros al cargar la página

actualizar();


// ==================================================
// 12. PRUEBAS DE LAS FUNCIONES EN CONSOLA
// ==================================================

listarTodos(libros);


console.log("\n=== Primera llamada a filtrar con límite 2 ===");

const resultado1 = filtrar(libros, 2);

console.log(`Devuelve: ${resultado1}\n`);


console.log("=== Segunda llamada a filtrar con límite 5 ===");

const resultado2 = filtrar(libros, 5);

console.log(`Devuelve: ${resultado2}\n`);


// Buscar títulos que contengan "de"

console.table(
    libros
        .map(libro => libro.titulo)
        .filter(titulo =>
            titulo.toLowerCase().includes("de")
        )
);


contarPorCategoria(libros, "genero");

contarPorCategoria(libros, "tipo");

contarPorCategoria(libros, "territorio");


// ==================================================
// 13. PRUEBA DE AÑADIR Y ELIMINAR
// ==================================================

const libroTemporal = new Libro({
    id: 9,
    titulo: "Libro de prueba",
    autor: "Autor de prueba",
    genero: "Prueba",
    tipo: "Novela",
    fechaSalida: "2026-01-01",
    descripcion: "Libro temporal para probar su alta y eliminación."
});
if (AñadirLibro(libros, libroTemporal)) {

    console.log("Libro añadido:", libroTemporal.titulo);

    console.log(
        "Libro eliminado:",
        EliminarLibro(libros, libroTemporal.id)
    );
}


// ==================================================
// 14. ESTADÍSTICAS
// ==================================================

console.log(estadisticas(libros));

console.log(estadisticas([]));

