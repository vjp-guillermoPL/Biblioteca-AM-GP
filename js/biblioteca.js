import { Libro } from "./libro.js";
import { buscarPorTexto, AñadirLibro, estadisticas } from "./logica.js";

/**
 * Clase madre es la que  guarda la colección de libros y ofrece los métodos para que trabaje con ella
 */
export class Biblioteca {
    /**
     * Crea una biblioteca con la lista de los libreos
     * @param {Libro[]} libros - Los libros que tenemos en la biblioteca
     */
    constructor(libros) {
        this._libros = libros;
    }

    /**
     * Crea una biblioteca desde los datos que tenemos en el archivo datos
     * @param {Object[]} datos - Los objetos son los datos del archivo 
     * @returns {Biblioteca} Una biblioteca con un Libro por cada objeto.
     */
    static desdeDatos(datos) {
        const libros = datos.map((d) => new Libro(d));
        return new Biblioteca(libros);
    }

    /**
     * Cuántos libros tenemos en la biblioteca
     * @returns {number} el total de libros que tenemos
     */
    get total() {
        return this._libros.length;
    }

    /**
     * devuelve una copiar de los libros 
     * @returns {Libro[]} 
     */
    listar() {
        return [...this._libros];
    }

    /**
     * Añade un libro con el id mayor
     * @param {Libro} libro aqui se añade el libro
     * @returns {number} el id que se le ha dado al libro
     */
    AñadirLibro(libro) {
        return AñadirLibro(this._libros, libro);
    }

    /**
     * Elimina el libro que tiene ese id.
     * @param {number} id - 
     * @returns {boolean} true si quita el booleano y false si se añade
     */
    eliminar(id) {
        const indice = this._libros.findIndex((libro) => libro.id === id);
        if (indice === -1) {
            return false;
        }
        this._libros.splice(indice, 1);
        return true;
    }

    /**
     * Busca los libros sin distinguir mayusculas
     * @param {string} texto - el texto que se esta buscando
     * @returns {Libro[]} los libros que contiene
     */
    buscar(texto) {
        return buscarPorTexto(this._libros, texto);
    }

    /**
     * Calcula las estadísticas de los libros.
     * @param {Libro[]} lista - Lista que se quiere analizar.
     * @returns {Object} Estadísticas de los libros.
     */
    estadisticas(lista = this._libros) {
        return estadisticas(lista);
    }
}