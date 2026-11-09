
"use strict";

const NOMBRE_APP = "Biblioteca-AM-GP";

const libros = [
    {
        id: 1,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Ficción",
        tipo: "Novela",
        fechaSalida: "1943-04-06",
        descripcion: "Un cuento filosófico que narra la historia de un joven príncipe que viaja a través del espacio y aprende lecciones sobre la vida y la naturaleza humana."
    },
    {
        id: 2,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        tipo: "Novela",
        fechaSalida: "1967-05-30",
        descripcion: "Una obra maestra del realismo mágico que cuenta la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo."
    },
    {
        id: 3,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Novela",
        tipo: "Novela",
        fechaSalida: "1605-01-16",
        descripcion: "Considerada la primera novela moderna, narra las aventuras de Don Quijote y su escudero Sancho Panza."
    },
    {
        id: 4,
        titulo: "La Odisea",
        autor: "Homero",
        genero: "Épica",
        tipo: "Poema épico",
        fechaSalida: "800-01-01",
        descripcion: "Un poema épico griego que narra el viaje de Odiseo mientras intenta regresar a su hogar después de la Guerra de Troya."
    },
    {
        id: 5,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        tipo: "Novela",
        fechaSalida: "1949-06-08",
        descripcion: "Una novela distópica que explora un futuro totalitario donde el gobierno controla todos los aspectos de la vida."
    },
    {
        id: 6,
        titulo: "Moby Dick",
        autor: "Herman Melville",
        genero: "Aventura",
        tipo: "Novela",
        fechaSalida: "1851-10-18",
        descripcion: "Una novela de aventuras que narra la obsesión del capitán Ahab por cazar a la gran ballena blanca."
    },
    {
        id: 7,
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        genero: "Romance",
        tipo: "Novela",
        fechaSalida: "1813-01-28",
        descripcion: "Una novela romántica sobre Elizabeth Bennet y su relación con el señor Darcy."
    },
    {
        id: 8,
        titulo: "Romeo y Julieta",
        autor: "William Shakespeare",
        genero: "Tragedia",
        tipo: "Obra de teatro",
        fechaSalida: "1597-01-01",
        descripcion: "Una tragedia romántica que narra la historia de amor entre Romeo y Julieta, dos jóvenes de familias rivales."
    }
];

const LIBROS_ANTIGUOS = "1800-01-01";

const DIAS_RECIENTE = 30;

// ==================================================
// Patrones de validación (retos sesión 12)
// ==================================================

const patronCodigo = /^[A-Z]{3}-\d{4}$/;

const patronTelefono = /^[6789]\d{8}$/;

const patronCorreo = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

console.log(`${NOMBRE_APP}: ${libros.length} libros`);
console.table(libros);

// ==================================================
// 1. LISTAR TODOS LOS LIBROS
// ==================================================

function listarTodos(coleccion) {
    console.log("-- Todos los libros --");

    for (const libro of coleccion) {
        const etiqueta =
            libro.fechaSalida <= LIBROS_ANTIGUOS
                ? "Antiguo"
                : "Reciente";

        console.log(
            `ID: ${libro.id}, Título: ${libro.titulo}, ` +
            `Autor: ${libro.autor}, Etiqueta: ${etiqueta}`
        );
    }
}

// ==================================================
// 2. FILTRAR LIBROS CON UNA CONDICIÓN Y UN LÍMITE
// ==================================================

function filtrar(coleccion, limite) {
    let encontrados = 0;

    console.log(
        "--- Filtro: tipo Novela y género distinto de Novela ---"
    );

    for (
        let i = 0;
        i < coleccion.length && encontrados < limite;
        i++
    ) {
        const libro = coleccion[i];

        if (
            libro.tipo === "Novela" &&
            libro.genero !== "Novela"
        ) {
            console.log(
                `${libro.id}. ${libro.titulo} - ${libro.genero}`
            );

            encontrados++;
        }
    }

    console.log(
        `${encontrados} de ${coleccion.length} libros cumplen la condición`
    );

    return encontrados;
}

// ==================================================
// 3. CONTAR LIBROS POR CATEGORÍA
// ==================================================

function contarPorCategoria(coleccion, criterio = "genero") {
    console.log(`--- Conteo por ${criterio} ---`);

    const conteos = {};

    for (const libro of coleccion) {
        if (typeof libro.id !== "number" || isNaN(libro.id)) {
            continue;
        }

        let categoria;

        switch (criterio) {
            case "genero":
                categoria = libro.genero;
                break;

            case "tipo":
                categoria = libro.tipo;
                break;

            case "territorio":
                categoria =
                    libro.fechaSalida <= LIBROS_ANTIGUOS
                        ? "Antiguo"
                        : "Reciente";
                break;

            default:
                console.warn(
                    `Criterio inesperado: ${criterio}. ` +
                    "Usa 'genero', 'tipo' o 'territorio'."
                );
                return;
        }

        if (conteos[categoria]) {
            conteos[categoria]++;
        } else {
            conteos[categoria] = 1;
        }
    }

    for (const categoria in conteos) {
        console.log(`${categoria}: ${conteos[categoria]} libro(s)`);
    }

    return conteos;
}

// ==================================================
// 4. BUSCAR LIBROS POR TEXTO
// ==================================================

function buscarPorTexto(coleccion, texto) {
    const buscado = String(texto || "")
        .toLowerCase()
        .trim();

    return coleccion.filter(libro => {
        return (
            String(libro.titulo).toLowerCase().includes(buscado) ||
            String(libro.autor).toLowerCase().includes(buscado) ||
            String(libro.genero).toLowerCase().includes(buscado) ||
            String(libro.tipo).toLowerCase().includes(buscado)
        );
    });
}

// ==================================================
// 5. ORDENAR LIBROS
// ==================================================

function ordenar(
    coleccion,
    campo,
    tipo = "texto",
    asc = true
) {
    const copia = [...coleccion];

    copia.sort((a, b) => {
        let resultado;

        if (tipo === "numero") {
            resultado = Number(a[campo]) - Number(b[campo]);
        } else if (tipo === "fecha") {
            resultado =
                crearFecha(a[campo]) - crearFecha(b[campo]);
        } else {
            resultado = String(a[campo]).localeCompare(
                String(b[campo]),
                "es",
                { sensitivity: "base" }
            );
        }

        return asc ? resultado : -resultado;
    });

    return copia;
}

// ==================================================
// 6. AÑADIR LIBRO
// ==================================================

function AñadirLibro(coleccion, libro) {
    if (!libro) {
        console.warn("No se puede añadir un libro vacío.");
        return false;
    }

    libro.id = siguienteId(coleccion);
    coleccion.push(libro);

    return libro;
}

// ==================================================
// 7. ELIMINAR LIBRO
// ==================================================

function EliminarLibro(coleccion, id) {
    const indice = coleccion.findIndex(
        libro => libro.id === id
    );

    if (indice === -1) {
        return false;
    }

    coleccion.splice(indice, 1);

    return true;
}

// ==================================================
// 8. ESTADÍSTICAS DE LOS ID
// ==================================================

function estadisticas(lista) {
    let novelas = 0;
    const generos = {};

    for (const libro of lista) {
        if (libro.tipo === "Novela") {
            novelas++;
        }

        if (generos[libro.genero]) {
            generos[libro.genero]++;
        } else {
            generos[libro.genero] = 1;
        }
    }

    let cantidadGeneros = 0;

    for (const genero in generos) {
        cantidadGeneros++;
    }

    return {
        totalLibros: lista.length,
        novelas,
        cantidadGeneros
    };
}


// ==================================================
// 9. CREAR TARJETAS HTML
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
    descripcion.textContent = libro.descripcion;

    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(libro.fechaSalida);

    if (diasDesde(libro.fechaSalida) <= DIAS_RECIENTE) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(nombre, datos, descripcion, fecha);

    return tarjeta;
}


// ==================================================
// 10. PINTAR LIBROS EN LA PÁGINA
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
// 11. BÚSQUEDA, ORDENACIÓN Y ACTUALIZACIÓN
// ==================================================

const buscador = document.querySelector("#buscador");

let orden = {
    campo: "id",
    tipo: "numero",
    asc: true
};

// ==================================================
// 11.5. COOKIES: guardar y leer el último orden
// ==================================================

function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;
    const texto = encodeURIComponent(valor);
    document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
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


function actualizar() {
    const texto = buscador.value;

    // 1. Filtrar
    let lista = buscarPorTexto(libros, texto);

    // 2. Ordenar
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
document.querySelector("#ordenFecha")
    .addEventListener("click", () => {
        orden = {
            campo: "fechaSalida",
            tipo: "fecha",
            asc: false
        };

        guardarCookie("orden", JSON.stringify(orden), 30);
        actualizar();
    });
// Predicción: si en la consola ejecutamos
//     document.cookie = "tema=oscuro"
// y después
//     console.log(document.cookie)
// ¿qué sale? ¿Se borra la cookie del orden?
//
// Respuesta: NO se borra. Asignar a document.cookie NO reemplaza
// todas las cookies, solo añade (o actualiza) la que se indica.
// Veríamos algo como "orden=...; tema=oscuro" (el orden de las
// claves puede variar). Cada asignación a document.cookie es una
// operación de escritura sobre UNA cookie, no sobre el conjunto.

// Al cargar la página, recuperamos el último orden guardado en la
// cookie (si existe) y lo aplicamos. Si no hay cookie o está
// mal formada, se mantiene el orden por defecto.
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

// Mostrar los libros al cargar la página
actualizar();

function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES",
        { day: "numeric", month: "long", year: "numeric" }
    );
}
function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;
    const ms = Date.now() - crearFecha(texto).getTime();
    return Math.floor(ms / MS_DIA);
}

// ==================================================
// 11.6. FORMULARIO DE AÑADIR LIBRO (retos sesión 12)
// ==================================================
// Validación en directo del campo código: muestra
// ✓/✗ mientras escribe, igual que en retos.js.
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

// Calcula el siguiente ID libre de la colección.
function siguienteId(coleccion) {
    let maximo = 0;
    for (const libro of coleccion) {
        if (
            typeof libro.id === "number" &&
            !isNaN(libro.id) &&
            libro.id > maximo
        ) {
            maximo = libro.id;
        }
    }
    return maximo + 1;
}

// Maneja el envío del formulario: valida el código con la
// expresión regular y, si pasa, añade el libro con AñadirLibro.
function anadirDesdeFormulario(evento) {
    evento.preventDefault();

    const aviso = document.querySelector("#avisoAnadir");
    const codigo = codigoNuevo.value.trim();

    // Campo validado con expresión regular:
    // si no cumple el patrón, se avisa y no se añade.
    if (!patronCodigo.test(codigo)) {
        aviso.textContent =
            "El código no cumple el formato ABC-1234 " +
            "(tres letras mayúsculas, guion y cuatro dígitos).";
        aviso.style.color = "red";
        return;
    }

    const titulo = document.querySelector("#tituloNuevo").value.trim();
    const autor = document.querySelector("#autorNuevo").value.trim();
    const genero = document.querySelector("#generoNuevo").value.trim();
    const tipo = document.querySelector("#tipoNuevo").value.trim();
    const fechaSalida = document.querySelector("#fechaNuevo").value;
    const descripcion = document.querySelector("#descripcionNuevo").value.trim();

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

    const nuevoLibro = {
        id: siguienteId(libros),
        codigo,
        titulo,
        autor,
        genero,
        tipo,
        fechaSalida,
        descripcion
    };

    if (AñadirLibro(libros, nuevoLibro)) {
        aviso.textContent = `Libro añadido: ${nuevoLibro.titulo}`;
        aviso.style.color = "green";
        evento.target.reset();
        okCodigo.textContent = "";
        actualizar();
    } else {
        aviso.textContent = "No se pudo añadir el libro (ID duplicado).";
        aviso.style.color = "red";
    }
}

document
    .querySelector("#formAnadir")
    .addEventListener("submit", anadirDesdeFormulario);

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

// Prueba de alta y eliminación
const libroTemporal = {
    id: 9,
    titulo: "Libro de prueba",
    autor: "Autor de prueba",
    genero: "Prueba",
    tipo: "Novela",
    fechaSalida: "2026-01-01",
    descripcion: "Libro temporal para probar su alta y eliminación."
};

if (AñadirLibro(libros, libroTemporal)) {
    console.log("Libro añadido:", libroTemporal.titulo);

    console.log(
        "Libro eliminado:",
        EliminarLibro(libros, libroTemporal.id)
    );
}

// Estadísticas
estadisticas(libros);
estadisticas([]);
