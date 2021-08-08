let edad = prompt("ingrese su edad");
let nombre = prompt("ingrese su nombre");
let precio = 0;

if (edad >= 18) {
     alert("Bienvenido " + nombre);

     let producto = prompt("ingrese producto a comprar:  \n -vino \n -cerveza \n -gaseosa");

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


} else {
     alert("Lo sentimos " + nombre + ' ' + "pero necesita ser mayor de 18 años para comprar");
}

console.log(precio);