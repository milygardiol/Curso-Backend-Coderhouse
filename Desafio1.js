//Declarar una clase Usuario

class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    }

    //métodos

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(mascotas) {
        this.mascotas.push(mascotas);
    }

    countMascotas() {
       const cantidadMascotas = this.mascotas.length()
       console.log(cantidadMascotas)
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor:autor})
    }

    getBookNames() {
        const bookMap = this.libros.map(e => e.nombre);
        console.log(bookMap)
    }
}

const nuevoUsuario = new Usuario ("Mily", "Gardiol", [{ nombre: "Boulevard", autor:"Flor M. Salvador"}], ["Gatito"]);

nuevoUsuario.getFullName();
nuevoUsuario.addMascota("Perrito");
nuevoUsuario.countMascotas();
nuevoUsuario.addBook("Damián", "Alex Mirez")
nuevoUsuario.getBookNames();
