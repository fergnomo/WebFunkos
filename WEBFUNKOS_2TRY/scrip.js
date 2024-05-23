//Variables
const carrito = document.getElementById("carrito")
const listaFunkos = document.getElementById("lista-funkos")
const contenedorCarrito = document.querySelector('.buy-card .lista-funkos')
const vaciarCarritoBtn = document.querySelector('vaciar_carrito')

 let articulosCarrito = [];

 registrarEventsListener();

 function registrarEventsListener() {
    //Cuando yo le de click a agregar
    listaFunkos.addEventListener('click', agregarFunko);
 }

 function agregarFunko(e){
    if (e.target.classList.contains("agregar-carrito")){
        const funkoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(funkoSeleccionado)
    }
 }

 //Leer el contenido de nuestro HTML al que le dimos click y extrae la info del curso
 function leerInfo(funko) {
    //Crear un objeto con el contenido del curso actual
    const infoFunko = {
        imagen: funko.querySelector('img').src,
        titulo: funko.querySelector('h3').textContent,
        precio: funko.querySelector('.descuento').textContent,
        id: funko.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    articulosCarrito = [...articulosCarrito,infoFunko]
    console.log(articulosCarrito)
    carritoHTML()
 }

 function carritoHTML() {
   //Recorre el carrito de compras y genera el HTML
   articulosCarrito.forEach(funko => {
       const fila = document.createElement('div');
       fila.innerHTML = `
           <img src="${funko.imagen}"></img>
           <p>${funko.titulo}</p>
           <p>${funko.precio}</p>
           <p>${funko.cantidad}</p>
           <p><span class="borrar-curso" data-id="${funko.id}">X</span></p>
       `;

       contenedorCarrito.appendChild(fila)
   });
}
