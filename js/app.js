
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
        fechaSalida: "-800-01-01",
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
        if (!Number.isFinite(libro.id)) {
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

    for (const [categoria, cantidad] of Object.entries(conteos)) {
        console.log(`${categoria}: ${cantidad} libro(s)`);
    }

    return conteos;
}

// ==================================================
// 4. BUSCAR LIBROS POR TEXTO
// ==================================================

function buscarPorTexto(coleccion, texto) {
    const buscado = texto
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
    if (
        !libro ||
        !Number.isFinite(libro.id) ||
        coleccion.some(elemento => elemento.id === libro.id)
    ) {
        console.warn("Libro no válido o ID duplicado.");
        return false;
    }

    coleccion.push(libro);

    return true;
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
    if (lista.length === 0) {
        console.warn(
            "No se pueden calcular estadísticas: la lista está vacía."
        );
        return;
    }

    let total = 0;
    let cantidad = 0;
    let elementoMayor = null;

    for (const elemento of lista) {
        if (!Number.isFinite(elemento.id)) {
            continue;
        }

        total += elemento.id;
        cantidad++;

        if (
            elementoMayor === null ||
            elemento.id > elementoMayor.id
        ) {
            elementoMayor = elemento;
        }
    }

    if (cantidad === 0) {
        console.warn(
            "No hay elementos con un ID numérico."
        );
        return;
    }

    const media = total / cantidad;

    console.log("=== Mostrar estadísticas ===");
    console.log(`Total de IDs: ${total}`);
    console.log(`Media de IDs: ${media.toFixed(1)}`);
    console.log("Elemento con el ID más alto:", elementoMayor);

    return {
        total,
        cantidad,
        media,
        elementoMayor
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

    tarjeta.append(nombre, datos, descripcion);

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

// Mostrar los libros al cargar la página
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
