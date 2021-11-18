class MainController{
    constructor(){
        this.client = {};
        this.products = [];
        this.precios = [];
        this.products_sale = [];
        this.products_stock = [];
        this.total = 0;
    }
    hello_client(){
        console.log(`Hola ${this.client.nombre} ${this.client.apellido} cómo estás?`);
    }


    update_client(persona){
        this.client = persona;
    }

    add_product(id, i){
        id = parseInt(id);
        const product_clone = Object.assign(Object.create(this.products_stock[id]), this.products_stock[id]);
        product_clone.id = i;
        this.products.push(product_clone);
        this.precios.push(product_clone.precio);
        this.total += product_clone.precio;
        this.update_total_html();
    }

    show_cart_info(){
        let total = 0;
        let msg = "Resumen de compra para " + this.client.nombre + ": \n";
        for(const product of this.products){
            total += product["precio"];
            msg += product["text"] + "\n"
        }
        this.total = total;
        this.update_total_html();
        msg += "----------------------------------------- \n"
        msg += "Total: $" + total.toString();
        alert(msg);
        console.log(`Detalle de cuenta:  ${this.precios.join(" + ")} = ${total.toString()}`);
    }

    show_cart_info_discounts(){
        let total = 0;
        let msg = "Resumen de compra para " + this.client.nombre + ": \n";
        for(const product of this.products_sale){
            total += product["precio"];
            msg += product["text"] + "\n"
        }
        this.total = total;
        this.update_total_html();
        msg += "----------------------------------------- \n"
        msg += "Total: $" + total.toString();
        alert(msg);
        console.log(`Detalle de cuenta:  ${this.precios.join(" + ")} = ${total.toString()}`);
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

    autoload_products(){
        this.products_stock = [];
        let products_elements = document.getElementsByClassName("probootstrap-text");
        let i = 0;
        for (const product_text of products_elements){
            let aux = product_text.innerHTML;
            aux = aux.replace(/[\n\r]/g,'').trim();
            aux = aux.replace('<h3>','');
            aux = aux.replace('</h3>','');
            aux = aux.split(": $");
            let product = new Product(aux[0] + "|" + aux[1], i);
            if(product.check_format()){
                this.products_stock.push(product);
            }
            i += 1
        }
    }

    update_total_html(){
        // Agregado entrega 8
        let div_subtitulo = document.getElementById('subtitulo');
        div_subtitulo.children[0].children[2].innerHTML = `<h4>Debes $ ${this.total}!</h4>`;
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
    // Agregado entrega 8: lee automaticamente los productos cargados en el html.
    mainController.autoload_products();
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

    // Agregado entrega 8
    let div_subtitulo = document.getElementById('subtitulo');
    let parrafo = document.createElement("p");
    parrafo.innerHTML = `<h4>¡Hola ${persona.nombre} ${persona.apellido}!</h4>
                         <br>
                         <h4>¡Hola ${persona.nombre} ${persona.apellido}!</h4>`;
    parrafo.classList.add('subtitle');
    div_subtitulo.appendChild(parrafo);
    console.log(parrafo);


}


function request_data_products(){
    alert("A continuacion te solicitare que ingreses los ID de 3 productos. El listado completo de los mismos sera brindado a continuación:");
    ids_allowed = {}
    text_products = "";
    for(const product of mainController.products_stock){
        text_products += `ID: ${product.id.toString()}  -->  ${product.nombre} $ ${product.precio} \n`;
        ids_allowed[product.id.toString()] = "";
    }

    alert(text_products);
    console.log(text_products);

    for(let i=0; i<3; i++){
        let id = prompt("Ingresa el id para el producto " + i.toString() );
        while(!(id in ids_allowed)){
            id = prompt("No existe producto con dicho ID. Ingresa nuevamente el id para el producto " + i.toString() );
        }
        mainController.add_product(id, i);
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




