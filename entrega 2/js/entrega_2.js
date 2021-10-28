let nombre = prompt("Ingresa tu nombre!");
let entrada1 = prompt("Ingresar un numero mayor a 10");


while(isNaN(parseFloat(entrada1)) || parseFloat(entrada1) <= 10){
    entrada1 = prompt("Debe ser un numero y mayor a 10. Ingrese nuevamente un numero mayor a 10.");
}

let entrada2 = prompt("Ingresar otro numero mas");
while(isNaN(parseFloat(entrada2))){
    entrada2 = prompt("Debe ser un numero. Ingreselo nuevamente.");
}

let suma = parseFloat(entrada1) + parseFloat(entrada2);
let resta = parseFloat(entrada1) - parseFloat(entrada2);
let mult = parseFloat(entrada1) * parseFloat(entrada2);

let question = prompt("Cuanto es la suma de los dos numeros ingresados?");
let contador = 1;
while(isNaN(parseFloat(question)) || parseFloat(question) != suma){
    contador += 1;
    question = prompt("Mal!! intente nuevamente: Cuanto es la suma de los dos numeros ingresados?");
}

if(parseFloat(entrada2) > 10){
    alert("Hola " + nombre + "! espero te encuentres bien. A continuacion te mostrare algunos resultados de operaciones matematicas utilizando los numeros que ingresaste:\n\nNumero 1: " + entrada1 + "\nNumero 2: " + entrada2 + "\n(Ambos son mayores a 10)" + "\n\nLa suma es: " + suma.toString() + "\nLa resta es: " + resta.toString() + "\nLa multiplicacion es: " + mult.toString() + "\n\n Resolviste la pregunta en " + contador.toString() + " intento/s.");
}
else{
    alert("Hola " + nombre + "! espero te encuentres bien. A continuacion te mostrare algunos resultados de operaciones matematicas utilizando los numeros que ingresaste:\n\nNumero 1: " + entrada1 + "\nNumero 2: " + entrada2 + "\n\nLa suma es: " + suma.toString() + "\nLa resta es: " + resta.toString() + "\nLa multiplicacion es: " + mult.toString() + "\n\n Resolviste la pregunta en " + contador.toString() + " intento/s.");
}
console.log("La suma es: " + suma.toString() + "\nLa resta es: " + resta.toString() + "\nLa multiplicacion es: " + mult.toString());

