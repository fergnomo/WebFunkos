//Variables
const carrito = document.getElementById("carrito")
const listaFunkos = document.getElementById("lista-funkos")
const contenedorCarrito = document.querySelector('.buy-card .lista-funkos')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

 let articulosCarrito = [];

 registrarEventsListeners();

 function registrarEventsListeners() {
    //Cuando yo le de click a "agregar al carrito de compras"
    listaFunkos.addEventListener('click', agregarFunko);
    //Eliminar funko del carrito
    carrito.addEventListener('click', eliminarFunko);
    //Muestra los funkos del carrito
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML()
    })
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

function vaciarCarrito(e){
    articulosCarrito = [];
    limpiarHTML()
}

 function agregarFunko(e){
    if (e.target.classList.contains("agregar-carrito")){
        const funkoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(funkoSeleccionado)
    }
 }

 //Función eliminar funko
 function eliminarFunko(e){
    if (e.target.classList.contains("borrar-funko")){
        const funkoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(funko => funko.id !== funkoId)
        carritoHTML()
    }
 }

 //Leer el contenido de nuestro HTML al que le dimos click y extrae la info del funko
 function leerInfo(funko) {
    //Crear un objeto con el contenido del funko actual
    const infoFunko = {
        imagen: funko.querySelector('img').src,
        titulo: funko.querySelector('h3').textContent,
        precio: funko.querySelector('.descuento').textContent,
        id: funko.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some(funko => funko.id === infoFunko.id)
    
    if (existe) {
        const funkos = articulosCarrito.map(funko => {
            if (funko.id === infoFunko.id) {
                funko.cantidad ++;
                return funko 
            } else {
                return funko;
            } 
        });
        [...articulosCarrito,infoFunko]

    } else {
        articulosCarrito = [...articulosCarrito,infoFunko]
    }
    carritoHTML()
 }

 function carritoHTML() {
   limpiarHTML()
    //Recorre el carrito de compras y genera el HTML
   articulosCarrito.forEach(funko => {
       const fila = document.createElement('div');
       fila.innerHTML = `
           <img src="${funko.imagen}"></img>
           <p>${funko.titulo}</p>
           <p>${funko.precio}</p>
           <p>${funko.cantidad}</p>
           <p><span class="borrar-funko" data-id="${funko.id}">X</span></p>
       `;

       contenedorCarrito.appendChild(fila)
   });
   sincronizacionStorage()
}

function sincronizacionStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

//Elimina los funkos de la lista
function limpiarHTML(){
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
   sincronizacionStorage()
}

