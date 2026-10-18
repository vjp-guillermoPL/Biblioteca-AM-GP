# Biblioteca-AM-GP

## Qué hace la aplicación

La aplicación carga una colección de libros de ejemplo y muestra los datos en la consola del navegador. También permite listar los libros, filtrarlos, buscar títulos por texto, contar libros por categoría, añadir y eliminar libros, y mostrar estadísticas.

## Datos de cada elemento

Cada libro tiene estos campos:

| Campo | Descripción |
| --- | --- |
| `id` | Identificador numérico del libro. |
| `titulo` | Título de la obra. |
| `autor` | Autor o autora. |
| `genero` | Género literario. |
| `tipo` | Tipo de obra, por ejemplo novela o poema épico. |
| `fechaSalida` | Fecha de publicación en formato `AAAA-MM-DD`. |
| `descripcion` | Resumen breve de la obra. |

Los ocho libros de ejemplo son *El principito*, *Cien años de soledad*, *Don Quijote de la Mancha*, *La Odisea*, *1984*, *Moby Dick*, *Orgullo y prejuicio* y *Romeo y Julieta*.

El array actual contiene además un objeto vacío (`{}`), que no es un registro completo de libro.

## Trabajo del Sprint 0

- Se muestran los libros con `console.table` y se pueden listar en la consola.
- Se filtran libros por tipo y género, con un límite indicado al llamar a la función.
- Se cuentan libros por género, tipo o antigüedad.
- La búsqueda de texto no distingue entre mayúsculas y minúsculas.
- Se pueden añadir y eliminar libros de la colección.
- Las estadísticas calculan el total y la media de los ID, y muestran el libro con el ID más alto. Si la lista está vacía, se avisa sin calcular.

## Cómo se ejecuta

Abre `index.html` en un navegador y consulta la consola de las herramientas de desarrollo (F12). El archivo carga `js/app.js`, que ejecuta los ejemplos y muestra los resultados en la consola. Las funciones también se pueden llamar desde esa consola.

## Uso de IA

Redacción del README.

## Trabajo en pareja

Integrantes: Ángel Montero (`vjp-angelMG1`) y Guillermo Prol (`gproll` / `1DAW-Guillermoprollopez`). Según lo indicado por el equipo, el autor de cada commit sirve como referencia de quién tecleó ese tramo de trabajo:

- Ángel Montero: `cambios`, `eliminar libro` (dos commits), `añadir libro` y `buscar por texto`.
- Guillermo Prol: `estructura inicial del proyecto`, `datos de ejemplo`, `listado completo`, `filtro por tipo`, `Refactor app.js: add listarTodos, filtrar, and contarPorCategoria functions` y `Llamada de las funciones y estadisticas`.
