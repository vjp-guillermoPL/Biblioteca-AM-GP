// js/logica.js
// Funciones que trabajan con los datos.

export const LIBROS_ANTIGUOS = "1800-01-01";

export const DIAS_RECIENTE = 30;

// Patrones de validación.

export const patronCodigo = /^[A-Z]{3}-\d{4}$/;

export const patronTelefono = /^[6789]\d{8}$/;

export const patronCorreo = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;


// ==================================================
// 1. LISTAR TODOS LOS LIBROS
// ==================================================

export function listarTodos(coleccion) {
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

export function filtrar(coleccion, limite) {
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

export function contarPorCategoria(coleccion, criterio = "genero") {
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

export function buscarPorTexto(coleccion, texto) {
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

export function ordenar(
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

export function AñadirLibro(coleccion, libro) {
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

export function EliminarLibro(coleccion, id) {
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
// 8. ESTADÍSTICAS
// ==================================================

export function estadisticas(lista) {
    const paginas = lista.map((libro) => libro.paginas);

    const paginasTotales = paginas.reduce(
        (suma, paginas) => suma + paginas,
        0
    );

    const novelas = lista.filter(
        (libro) => libro.tipo === "Novela"
    ).length;

    const mediaPaginas = lista.length > 0
        ? paginasTotales / lista.length
        : 0;

    return {
        totalLibros: lista.length,
        novelas,
        paginasTotales,
        mediaPaginas
    };
}


// ==================================================
// FUNCIONES AUXILIARES DE FECHAS E ID
// ==================================================

export function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

export function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;

    const ms = Date.now() - crearFecha(texto).getTime();

    return Math.floor(ms / MS_DIA);
}

export function siguienteId(coleccion) {
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