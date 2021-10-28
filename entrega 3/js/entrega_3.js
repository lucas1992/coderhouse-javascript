let nombre = prompt("Ingresa tu nombre!");
let entrada1 = prompt("Ingresar un numero");


while(isNaN(parseFloat(entrada1)) ){
    entrada1 = prompt("Debe ser un numero. Ingreselo nuevamente.");
}

let entrada2 = prompt("Ingresar otro numero mas");
while(isNaN(parseFloat(entrada2))){
    entrada2 = prompt("Debe ser un numero. Ingreselo nuevamente.");
}

let suma = parseFloat(entrada1) + parseFloat(entrada2);
let resta = parseFloat(entrada1) - parseFloat(entrada2);
let mult = parseFloat(entrada1) * parseFloat(entrada2);

console.log("Ejecutando factorial del primer numero ingresado:");
let factorial = 1;
for(let i=1; i<=parseInt(entrada1, 10); i++){
    factorial = factorial * i;
}


let question = prompt("Cuanto es la multiplicacion de los dos numeros ingresados?");
let contador = 1;
while(isNaN(parseFloat(question)) || parseFloat(question) != mult){
    if(contador == 3){
        alert("Se te acabaron los intentos!!");
        console.log("Se te acabaron los intentos");
        break;
    }
    contador += 1;
    question = prompt("Mal!! intente nuevamente: Cuanto es la multiplicacion de los dos numeros ingresados?");
}

if(contador == 3){
    alert("Hola " + nombre + "! espero te encuentres bien. A continuacion te mostrare algunos resultados de operaciones matematicas utilizando los numeros que ingresaste:\n\nNumero 1: " + entrada1 + "\nNumero 2: " + entrada2 + "\n\nLa suma es: " + suma.toString() + "\nLa resta es: " + resta.toString() + "\nLa multiplicacion es: " + mult.toString() + "\nEl factorial del primer numero es: " + factorial.toString() + "\n\n No lograste resolver la pregunta. Suerte la proxima!");
}
else{
    alert("Hola " + nombre + "! espero te encuentres bien. A continuacion te mostrare algunos resultados de operaciones matematicas utilizando los numeros que ingresaste:\n\nNumero 1: " + entrada1 + "\nNumero 2: " + entrada2 + "\n\nLa suma es: " + suma.toString() + "\nLa resta es: " + resta.toString() + "\nLa multiplicacion es: " + mult.toString() + "\nEl factorial del primer numero es: " + factorial.toString() + "\n\n Resolviste la pregunta en " + contador.toString() + " intento/s.");
}


