class MainController{
    constructor(){
        this.client = {};
        this.products = [];
    }
    hello_client(){
        console.log("Hola " + this.client.nombre + " " + this.client.apellido + " cómo estás?");
    }

    update_client(persona){
        this.client = persona;
    }

    add_product(product){
        this.products.push(product)
    }

    show_cart_info(){
        let total = 0;
        let msg = "Resumen de compra para " + this.client.nombre + ": \n";
        for(let i=0; i<this.products.length; i++){
            total += this.products[i]["precio"];
            msg += this.products[i]["text"] + "\n"
        }
        msg += "----------------------------------------- \n"
        msg += "Total: $" + total.toString();
        alert(msg);
    }
}

class Persona{
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class Product{
    constructor(text_str){
        this.text = text_str;
        this.nombre = "";
        this.precio = 0;
    }
    check_format(){
        let aux = this.text.split("|");
        if(aux.length != 2){
            return false;
        }else{
            this.parser_text();
            return true;
        }
    }
    parser_text(){
        let aux = this.text.split("|");
        let precio = aux[1].split("$");
        if(precio.length == 2){
            precio = parseFloat(precio[1]);
        }else{
            precio = parseFloat(precio[0]);
        }
        this.nombre = aux[0];
        this.precio = precio;
    }
}



// initialize global variable mainController
var mainController = new MainController();


$(window).on('load', function(){
    restart();
});

$(function () {

});

function restart(){
    request_personal_info();
    request_data_products();
    mainController.show_cart_info();
    //show_cart_info();
}


function request_personal_info(){
    let nombre = prompt("Ingresa tu nombre!");
    let apellido = prompt("Ingresa tu apellido!");
    let edad = prompt("Ingresa tu edad");

    const persona = new Persona(nombre, apellido, edad);
    mainController.update_client(persona);
    mainController.hello_client();

    if(parseInt(edad) < 18) {
        console.log("Recuerda que si eres menor la compra debe estar supervisada por un mayor de edad!.");
    }
}


function request_data_products(){
    alert("En esta primera etapa, con los conocimientos que adquirimos solo puedo solitarte que ingreses los productos via prompt:");
    alert("A continuacion te solicitare que ingreses 3 productos con el siguiente formato: 'Nombre | precio'");

    for(let i=0; i<3; i++){
        let product = prompt("Ingresa el producto " + i.toString() + " con el siguiente formato: 'Nombre | precio'");
        product = new Product(product);
        while(!product.check_format()){
            product = prompt("Ingresa el producto " + i.toString() + " con el siguiente formato: 'Nombre | precio'");
            product = new Product(product);
        }
        mainController.add_product(product);
    }
}







