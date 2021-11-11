class MainController{
    constructor(){
        this.client = {};
        this.products = [];
        this.precios = [];
        this.products_sale = [];
    }
    hello_client(){
        console.log("Hola " + this.client.nombre + " " + this.client.apellido + " cómo estás?");
    }

    update_client(persona){
        this.client = persona;
    }

    add_product(product){
        this.products.push(product)
        this.precios.push(product.precio);
    }

    show_cart_info(){
        let total = 0;
        let msg = "Resumen de compra para " + this.client.nombre + ": \n";
        for(const product of this.products){
            total += product["precio"];
            msg += product["text"] + "\n"
        }
        msg += "----------------------------------------- \n"
        msg += "Total: $" + total.toString();
        alert(msg);
        console.log("Detalle de cuenta: " + this.precios.join(" + ") + " = " + total.toString());
    }

    show_cart_info_discounts(){
        let total = 0;
        let msg = "Resumen de compra para " + this.client.nombre + ": \n";
        for(const product of this.products_sale){
            total += product["precio"];
            msg += product["text"] + "\n"
        }
        msg += "----------------------------------------- \n"
        msg += "Total: $" + total.toString();
        alert(msg);
        console.log("Detalle de cuenta: " + this.precios.join(" + ") + " = " + total.toString());
    }

    find_by_id(id){
        const result = this.products.find(elemento => elemento.id === id);
        if(result != undefined){
            console.log("Encontrado!!")
            alert(result.text);
        }else{
            console.log("No encontrado!");
            alert("No encontrado!");
        }
    }

    apply_discounts(percentage){
        this.products_sale = this.products.map(product => ({
            precio: product.precio * (1 - percentage/100),
            id: product.id,
            text: product.text,
            nombre: product.nombre,
        }));
    }

    sort_products(asc = true){
        if(asc){
            this.products = this.products.sort(function(a, b){return a.precio - b.precio})
        }else{
            this.products = this.products.sort(function(a, b){return b.precio - a.precio})
        }
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
    constructor(text_str, id){
        this.id = id;
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
    mainController.sort_products(false);
    mainController.show_cart_info();
    find_by_id();
    apply_discounts();
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
        product = new Product(product, i);
        while(!product.check_format()){
            product = prompt("Ingresa el producto " + i.toString() + " con el siguiente formato: 'Nombre | precio'");
            product = new Product(product, i);
        }
        mainController.add_product(product);
    }
}


function find_by_id(){
    let id = prompt("Ingresa un id (0, 1, 2) para encontrar un producto!");
    mainController.find_by_id(parseInt(id));
}

function apply_discounts(){
    let percentage = prompt("Ingresa un porcentaje de descuento para aplicar a los productos (0-100)");
    mainController.apply_discounts(parseFloat(percentage.split("%")[0]));
    mainController.show_cart_info_discounts();
}





