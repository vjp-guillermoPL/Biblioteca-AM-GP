export class Libro {
    constructor(datos) {
        this.id = datos.id;
        this.codigo = datos.codigo || "";
        this.titulo = datos.titulo;
        this.autor = datos.autor;
        this.genero = datos.genero;
        this.tipo = datos.tipo;
        this.fechaSalida = datos.fechaSalida;
        this.descripcion = datos.descripcion || "";
    }

    get id() {
        return this._id;
    }

    set id(valor) {
        if (typeof valor !== "number" || valor <= 0) {
            throw new Error(`ID no válido en "${this.titulo || "libro"}": ${valor}`);
        }
        this._id = valor;
    }

    get fechaTexto() {
        return new Date(this.fechaSalida + "T00:00").toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    descripcionTarjeta() {
        return this.descripcion;
    }
}