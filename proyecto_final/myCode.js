class MainController{
    constructor(){
        this.client = {};
        this.products = [];
        this.precios = [];
        this.products_sale = [];
        this.products_stock = [];
        this.total = 0;
        this.last_index = 0;
    }
    hello_client(){
        console.log(`Hola ${this.client.nombre} ${this.client.apellido} cómo estás?`);
    }


    update_client(persona){
        this.client = persona;
    }

    add_product(id){
        id = parseInt(id);
        const product_clone = Object.assign(Object.create(this.products_stock[id]), this.products_stock[id]);
        this.last_index = this.last_index + 1;
        product_clone.id = this.last_index;
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

    load_products(productos){
        this.products_stock = [];

        let products_elements = document.getElementById("listadoProductos");
        let i = 0;
        for (const prod of productos){
            let aux = prod["text"].replace(/[\n\r]/g,'').trim();
            aux = aux.replace('<h3>','');
            aux = aux.replace('</h3>','');
            aux = aux.split(": $");
            let product = new Product(aux[0] + "|" + aux[1], i);
            if(!(product.check_format())){
                continue;
            }

            this.products_stock.push(product);

            // Lo cargo en el HTML
            let prod_div_1 = document.createElement("div");
            prod_div_1.classList.add('col-lg-3');
            prod_div_1.classList.add('col-md-6');
            prod_div_1.classList.add('probootstrap-animate');
            prod_div_1.classList.add('mb-3');


            let prod_a = document.createElement("a");
            prod_a.classList.add('probootstrap-thumbnail');
            prod_a.setAttribute("href", "#");

            let prod_img = document.createElement("img");
            prod_img.classList.add('img-fluid');
            prod_img.classList.add('img-product');
            prod_img.setAttribute("src", prod["img_src"]);

            let prod_div_2 = document.createElement("div");
            prod_div_2.classList.add('probootstrap-text');

            let prod_h3 = document.createElement("h3");
            prod_h3.innerHTML = prod["text"];

            let prod_id = document.createElement("label");
            prod_id.style.display = 'none';
            prod_id.innerHTML = i.toString();

            prod_div_2.appendChild(prod_h3);
            prod_a.appendChild(prod_img);
            prod_a.appendChild(prod_div_2);
            prod_a.appendChild(prod_id);
            prod_div_1.appendChild(prod_a);
            products_elements.appendChild(prod_div_1);

            i += 1;


        }

        main_restart();


        let elements = document.getElementsByClassName("img-product");
        for (const element of elements){
            //element.addEventListener("click", click_product);
            element.onclick = () => {click_product(event)};
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
    let element = document.getElementById('head_main');
    element.onclick = () => {handleKeyPress(event)};
    restart();

});

$(function () {

});

function restart(){

    productos = request_data();
    mainController.load_products(productos);
    request_personal_info();
    /*
    request_data_products();
    mainController.sort_products(false);
    mainController.show_cart_info();
    find_by_id();
    apply_discounts();
    */
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

function request_data(){

    let array_productos = [
        {"img_src": "assets/images/producto_1.jpg", "text": "Reloj: $4500"},
        {"img_src": "assets/images/producto_2.jpg", "text": "Auriculares: $1500"},
        {"img_src": "assets/images/producto_3.jpg", "text": "Zapatilla: $11000"},
        {"img_src": "assets/images/producto_4.jpg", "text": "Zapatilla: $9999"},
        {"img_src": "assets/images/producto_5.jpg", "text": "Anteojos: $5000"},
        {"img_src": "assets/images/producto_6.jpg", "text": "Cámara retro: $7800"},
        {"img_src": "assets/images/producto_7.jpg", "text": "Banco vintage: $4300"},
        {"img_src": "assets/images/producto_8.jpg", "text": "Cactus deco: $1800"},
        {"img_src": "assets/images/producto_9.jpg", "text": "Mochila: $5200"},
        {"img_src": "assets/images/producto_10.jpg", "text": "Parlante: $8000"},
        {"img_src": "assets/images/producto_11.jpg", "text": "Smartwatch: $15999"},
        {"img_src": "assets/images/producto_12.jpg", "text": "Zapato: $11499"}
    ];

    return array_productos;
}

function click_product(event){

    let parent = event.target.parentElement
    id_prod = parent.children[2].innerHTML;
    mainController.add_product(id_prod);
}

function handleKeyPress(e){
     var key=e.keyCode || e.which;
      if (key==13){
         alert("Enter!!");
      }
}
