import { Libro } from "./libro.js";
import { buscarPorTexto, anadir } from "./logica.js";

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
        const libros = [];
        for (const d of datos) {
            libros.push(new Libro(d));
        }
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
    anadir(libro) {
        return anadir(this._libros, libro);
    }

    /**
     * Elimina el libro que tiene ese id.
     * @param {number} id - 
     * @returns {boolean} true si quita el booleano y false si se añade
     */
    eliminar(id) {
        for (let i = 0; i < this._libros.length; i++) {
            if (this._libros[i].id === id) {
                this._libros.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Busca los libros sin distinguir mayusculas
     * @param {string} texto - el texto que se esta buscando
     * @returns {Libro[]} los libros que contiene
     */
    buscar(texto) {
        return buscarPorTexto(this._libros, texto);
    }
}