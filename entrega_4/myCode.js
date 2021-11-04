
var global_data = {
    "personal": {},
    "productos": []
}

$(window).on('load', function(){
    restart();
});

$(function () {

});

function restart(){
    request_personal_info();
    request_data_products();
    show_cart_info();
}


function request_personal_info(){
    let nombre = prompt("Ingresa tu nombre!");
    let apellido = prompt("Ingresa tu apellido!");
    let edad = prompt("Ingresa tu edad");

    global_data.personal["nombre"] = nombre;
    global_data.personal["apellido"] = apellido;
    global_data.personal["edad"] = edad;

    console.log("Hola " + nombre + " " + apellido + " cómo estás?");

    if(parseInt(edad) < 18) {
        console.log("Recuerda que si eres menor la compra debe estar supervisada por un mayor de edad!.");
    }
}


function request_data_products(){
    alert("En esta primera etapa, con los conocimientos que adquirimos solo puedo solitarte que ingreses los productos via prompt:");
    alert("A continuacion te solicitare que ingreses 3 productos con el siguiente formato: 'Nombre | precio'");

    for(let i=0; i<3; i++){
        let producto = prompt("Ingresa el producto " + i.toString() + " con el siguiente formato: 'Nombre | precio'");
        let is_ok = check_format(producto);
        while(!is_ok){
            producto = prompt("Ingresa el producto " + i.toString() + " con el siguiente formato: 'Nombre | precio'");
            is_ok = check_format(producto);
        }
        add_product(producto);
    }
}

function check_format(data_string){
    let aux = data_string.split("|");
    if(aux.length != 2){
        return false;
    }else{
        return true;
    }
}

function add_product(data_string){
    let aux = data_string.split("|");
    let precio = aux[1].split("$");
    if(precio.length == 2){
        precio = parseFloat(precio[1]);
    }else{
        precio = parseFloat(precio[0]);
    }
    let producto = {};
    producto["text"] = data_string;
    producto["nombre"] = aux[0];
    producto["precio"] = precio;
    global_data.productos.push(producto);
}


function show_cart_info(){
    let total = 0;
    let msg = "Resumen de compra para " + global_data.personal.nombre + ": \n";
    for(let i=0; i<global_data.productos.length; i++){
        total += global_data.productos[i]["precio"];
        msg += global_data.productos[i]["text"] + "\n"
    }
    msg += "----------------------------------------- \n"
    msg += "Total: $" + total.toString();
    alert(msg);
}








