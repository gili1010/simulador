//variables
const carrito = document.getElementById("carrito");

let listaBebidas = document.getElementById("lista-bebidas");

const listaCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarrito = document.getElementById("vaciar-carrito");

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  //implementamos jquery

  $(document).ready(function () {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoHtml();
  });
}


//agregar bebida presionando boton agregar

//remplazamos la funcion onclick por jquery

$("#lista-bebidas").click((e) => {
  if (e.target.classList.contains("boton")) {
    e.preventDefault();

    const bebidaSeleccionada = e.target.parentElement.parentElement;

    leerDatos(bebidaSeleccionada);

   /*  alert("bebida agregada al carrito"); */

   const alerta = document.querySelector('#contenedor .alerta');
   if (alerta != null) {
         alerta.remove(); 
     }

     // se manda un alert al agregar un producto

    $("#contenedor").prepend(`<div class="alerta alert-color" role="alert">
                        Elemento agregado al carrito
                    </div>`);
      
           //se le da 1.5 s para desaparecer
    $("#contenedor .alerta").fadeOut(1500);
  }
});


//eliminar bebida del carrito
carrito.onclick = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {

    const bebidaId = e.target.getAttribute("data-id");


    articulosCarrito = articulosCarrito.filter(

      (bebida) => bebida.id !== Number(bebidaId)

    );

    totalCero();

    carritoHtml();
  }


};


//vaciar carrito de compras
vaciarCarrito.onclick = (e) => {
  articulosCarrito = [];

  limpiarHtml();

//agregamos el preco total

totalCero();


  //reseteamos el localstorage
  localStorage.clear();

}

//leer datos de la bebida
const leerDatos = async (bebida) => {

  try {

    //sacamos el id para compararlo con el id del archivo db.js

    const indice = bebida.querySelector("a").getAttribute("data-id");

    //recorremoslos productos del archivo db.js 
    const found = dab.find((element) => element.id === Number(indice));

    const info = {
      ...found,
      cantidad: 1,
    };

    //si el producto ya existe se le agrega una unidad
    const existe = articulosCarrito.some((elemento) => elemento.id === info.id);
    if (existe) {

      const bebidas = articulosCarrito.map((trago) => {
        if (trago.id === info.id) {
          trago.cantidad++;
          return trago;
        } else {
          return trago;
        }
      });
      articulosCarrito = [...bebidas];
    } else {
      //agregamos la bebida al carrito
      articulosCarrito = [...articulosCarrito, info];
    }
    carritoHtml();

  } catch (error) {
    console.log(error);
  }

};

//mostrar el carrito de compras en el html

const carritoHtml = () => {
  //limpiamos el html del carrito
  limpiarHtml();

  //recorre el carrito y genera el html
  articulosCarrito.forEach((bebida) => {
    const { img, title, precio, cantidad, id } = bebida;

   //calculaos el precio total del carrito
    total1=0;
    totalCantidad = 0;


    for (precios of articulosCarrito){

    
 /*  si la cantidad de unidades es mayor a 1 */
      

      total1 += ( precios.precio * precios.cantidad);
     }

    //agrega el Html del carrito en el tbody usando jquery

    $("#lista-carrito tbody").append(`
          <tr>
               <td>
               <img src="${img}" width="100">
               </td>
               <td>
                    ${title}
               </td>
               <td>
                    ${precio}
               </td>
               <td>
                    ${cantidad}
               </td>
               <td>
                ${totalCantidad = cantidad * precio}
                </td>
               <td>
                    <a  onclick="" href="#" class="borrar-curso" data-id="${id}"> x </a>
               </td>
          </tr>
          `);

          //agregamos el preco total



          const resultados = document.querySelector('#total div');
          if (resultados != null) {
             resultados.remove(); 
          }



          $("#total").append(`
          <div class="resultado">
               <span>
                   Total de su compra:$  ${total1}
               </span>
          </div>
          `);



    //localstorage

    const sincronizarStorage = () => {
      localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
    };

    sincronizarStorage();
  });
};

//funcion para limpiar carrito de compra
const limpiarHtml = () => {
  listaCarrito.innerHTML = "";
};


//traemos los productos del archivo db.js y los cargamos enel html

const card = document.getElementById("card").content;
const fragment = document.createDocumentFragment();

function completarTabla() {
  dab.forEach((element) => {
    card.querySelector("h5").textContent = element.title;
    card.querySelector("p").textContent = element.precio;
    card.querySelector("img").setAttribute("src", element.img);
    card.querySelector("a").setAttribute("data-id", element.id);

    card.addEventListener("click", leerDatos);

    const clone = card.cloneNode(true);
    fragment.appendChild(clone);
  });

  $("#lista-bebidas").append(fragment);

}

completarTabla();

//funcion para mostrar los datos filtrados
function filtrarTabla(array) {
  array.forEach((element) => {
    card.querySelector("h5").textContent = element.title;
    card.querySelector("p").textContent = element.precio;
    card.querySelector("img").setAttribute("src", element.img);
    card.querySelector("a").setAttribute("data-id", element.id);

    card.addEventListener("click", leerDatos);

    const clone = card.cloneNode(true);
    fragment.appendChild(clone);
  });

  $("#lista-bebidas").append(fragment);
  
}

//capturamos los 3 radiobuttons
let filtros = document.querySelectorAll('input[type="radio"]');

//filtramos cual esta checkeado de los 3
filtros.forEach(check => check.addEventListener("change", filtrando));

function filtrando(){
  //primero limpiamos el html para no duplicar la informacion
  listaBebidas.innerHTML = ""; 

  const checkeado = Array.from(filtros).filter(elemento => elemento.checked);

  const valorcheckeado = checkeado.map(elemento => elemento.value);

  let arrayFiltrado = [];

  //comparamos cual esta checkeado

  if (valorcheckeado == "todos"){
    arrayFiltrado = dab;
  }
  else if(valorcheckeado == "sinAlcohol"){
    arrayFiltrado = dab.filter(producto => producto.tipo == "sinAlcohol");
  }
  else if(valorcheckeado == "conAlcohol"){
    arrayFiltrado = dab.filter(producto => producto.tipo == "conAlcohol");
  }

  filtrarTabla(arrayFiltrado);
}


// funcion volver total a 0

const totalCero = () =>{
  const resultados = document.querySelector('#total div');
  if (resultados != null) {
        resultados.remove(); 
    }

$("#total").append(`
<div class="resultado">
   <span>
       Total de su compra:$  0
   </span>
</div>
`);
};