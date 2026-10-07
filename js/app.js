const NOMBRE_APP = "Biblioteca-AM-GP";

const libros = [
    {id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", genero: "Ficción", tipo: "Novela", fechaSalida: "1943-04-06", descripcion: "Un cuento filosófico que narra la historia de un joven príncipe que viaja a través del espacio y aprende lecciones sobre la vida y la naturaleza humana."},
    {id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", tipo: "Novela", fechaSalida: "1967-05-30", descripcion: "Una obra maestra del realismo mágico que cuenta la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo."},
    {id: 3, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela", tipo: "Novela", fechaSalida: "1605-01-16", descripcion: "Considerada la primera novela moderna, narra las aventuras del caballero Don Quijote y su fiel escudero Sancho Panza mientras luchan contra molinos de viento y enfrentan la realidad de su mundo."},
    {id: 4, titulo: "La Odisea", autor: "Homero", genero: "Épica", tipo: "Poema épico", fechaSalida: "-800-01-01", descripcion: "Un poema épico griego que narra el viaje del héroe Odiseo (Ulises) mientras intenta regresar a su hogar después de la Guerra de Troya, enfrentando numerosos desafíos y aventuras."},
    {id: 5, titulo: "1984", autor: "George Orwell", genero: "Distopía", tipo: "Novela", fechaSalida: "1949-06-08", descripcion: "Una novela distópica que explora un futuro totalitario donde el gobierno controla todos los aspectos de la vida de las personas, y la vigilancia y la represión son omnipresentes."},
    {id: 6, titulo: "Moby Dick", autor: "Herman Melville", genero: "Aventura", tipo: "Novela", fechaSalida: "1851-10-18", descripcion: "Una novela de aventuras que narra la obsesión del capitán Ahab por cazar a la gran ballena blanca Moby Dick, explorando temas de venganza, destino y la lucha del hombre contra la naturaleza."},
    {id: 7, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Romance", tipo: "Novela", fechaSalida: "1813-01-28", descripcion: "Una novela romántica que sigue la historia de Elizabeth Bennet y su relación con el orgulloso Sr. Darcy, explorando temas de clase social, matrimonio y las expectativas de la sociedad."},
    {id: 8, titulo: "Romeo y Julieta", autor: "William Shakespeare", genero: "Tragedia", tipo: "Obra de teatro", fechaSalida: "1597-01-01", descripcion: "Una tragedia romántica que narra la historia de amor prohibido entre Romeo y Julieta, dos jóvenes de familias rivales en Verona, y las consecuencias trágicas de su pasión."}
];

console.log(`${NOMBRE_APP}: ${libros.length} libros`);
console.table(libros);