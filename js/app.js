/* obtenemos los datos de lapersona */

class Persona {
     constructor(nombrePersona, edad, localidad){
          this.nombrePersona = nombrePersona;
          this.edad = edad;
          this.localidad = localidad;

     }
     presentacion(){
          console.log(`Bienvenido ${this.nombrePersona} su edad es ${this.edad} y vive en ${this.localidad}`);
     }

}

/* lapersona carga los datos por pantalla */
const persona1 = new Persona (nombre = prompt("ingrese su nombre"),edad = parseInt(prompt("ingrese su edad")),prompt("ingrese su localidad"));

/* mostramos x consola la persona */
console.log(persona1);
persona1.presentacion();


/* obtenemos los datos del producto */

class Producto {
     constructor(descripcion, precio, cantPedida){
          this.descripcion = descripcion;
          this.precio = precio;
          this.cantidadPedida = cantPedida;
     }
     descripcionProducto(){
          console.log(`Su producto es ${this.descripcion} y la cantidad pedida es ${this.cantidadPedida}`);
     }
};

let precio = 0; 

/* ingresamos los datos por consola */
const producto1 = new Producto(producto = prompt("ingrese producto a comprar:  \n -vino \n -cerveza \n -gaseosa"),parseFloat(precio),cantidad = parseInt(prompt("ingrese cantidad")));

/* mostramos los datos del producto */
console.log(producto1);
producto1.descripcionProducto();



/* consultamos si es mayor de edad */
if (edad >= 18) {
     alert("Bienvenido " + nombre);

     /* si es mayor de edad se ejecuta el siguiente codigo preguntando que va a comprar para sacar su precio */

     switch (producto) {
          case "vino":
               precio = 100;
               break;
          case "cerveza":
               precio = 150;
               break;
          case "gaseosa":
               precio = 50;
               break;
          default : 
               alert("producto incorrecto");
               producto = prompt("ingrese producto a comprar:  \n -vino \n -cerveza \n -gaseosa");
               break;
     }; 

/* si no es mayor de edad */
} else {
     alert(`Lo sentimos ${nombre} pero necesita ser mayor de 18 años para comprar`);
}

/* obtuvimos el precio */
console.log(precio);

/* depende la cantidad solicitada es el descuento que se le va a realizar por la compra */
descuento= 0;

if (cantidad <= 1){
     descuento = 5;
} else if (descuento >=2 && descuento <5) {
     descuento = 10;
}else{
     descuento = 20;
}

const suma = (a,b) => a+b;
const resta = (a,b) => a-b;

/* funcion para calcular el iva */
const iva = x => x * 0.21;


/* calculamos y mostramos el precio total de la compra con el iva y el descuento realizado */

const precioTotal = () => {
     let total =resta(suma(precio, iva(precio)), descuento);
     return total;
}

/* total = (precio + iva(precio)) - descuento; */

const resultado = () =>{
     console.log ("el precio total a pagar es: " + precioTotal());
}

resultado();