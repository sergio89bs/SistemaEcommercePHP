



/* -------------------------------------------------------------------------- */
/*                    EXISTEN PRODUCTOS EN EL LOCAL STORAGE?                 */
/* -------------------------------------------------------------------------- */
/*Si tenemos algun objeto almacenado en el localStorage, usamos el metodo getItem para capturar esos datos, y lo transformamos de nuevo en objetos
para meterlos en un array*/

if (localStorage.getItem("listOfProducts") != null) {

   

    var productStorage = JSON.parse(localStorage.getItem("listOfProducts"))
   

    /* ----------------- MOSTRAMOS EN EL CARRITO ESTOS PRODUCTOS ---------------- */

    //recorro con el foreach cada producto, concatenamos y lo mando imprimir al html

    productStorage.forEach(showProducts => {
        // console.log(showProducts.image);
        $('#listProdShopp').append(
            '<div class="panel-body panelBodyShop removeDiv">' +
            '<div class="col-md-2 col-sm-2 col-xs-3 " style="overflow: hidden;">' +
            '<img src="' + showProducts.image + '" class="img-responsive">' +
            '</div>' +
            '<div class="col-md-4 col-sm-4 col-xs-5">' +
            '    <h3 class="nameShopCart">' + showProducts.name + '</h3>' +
            '</div>' +
            '<div class="col-md-2 col-sm-2 col-xs-3 ">' +
            
            '<input type="number" class="form-control chooseQuantity" one= "'+showProducts.weightOneUnit+'" min="1" value="'+showProducts.quantity+'" priceOneUnit="'+showProducts.priceOneUnit+'" '+
            ' idQuanti ="'+showProducts.id+'">'+	
            
            '</div>' +
            '<div class="col-md-3  col-sm-2 col-xs-0 priceProductCart">' +
                //  Clase priceQuantity lo conacateno con el id de cada producto para asi diferencarlos, de tipo number para imprimir numeros
                 '<h3 class="priceShopCart priceQuanti'+ showProducts.id+' "><strong>' + Number(showProducts.priceOffer).toFixed(2) + '</strong></h3>' +
                 '<span style="margin-left:5px"><h3 style="margin:0"><strong"> €</strong></h3></span>'+
            '</div>' +            
            '<div class="col-md-1 col-sm-2 col-xs-2 weightProduct" >' +
            '<button class="btn btn-default firstColors removeItem pull-right" idProduct="' + showProducts.id + '" >' +
            '<i class="fa fa-trash"></i></button>' +
            // este div es hidden para obtener el peso de cada producto
            '<div class="col-md-4 col-sm-4 col-xs-5 ">' +
            '    <h3 class="weightOneUnit" >' + showProducts.weightOneUnit + '</h3>' +
            '    <h3 class="weight'+showProducts.id+' weightTotal" wT="'+Number(showProducts.weight)+'"><strong>'+ Number(showProducts.weight).toFixed(2)+'</strong></h3>' +
            '</div>' +
            // '<h1>'+showProducts.weight+'</h1>'+
            '</div>' +
            '</div>'
        );
    });
    // Si no hay productos en la lista de compra, imprimo el siguiente mensaje
} else {

    $('#listProdShopp').append('<div style="margin-left:20px;"><h4>Your shopping cart is empty...</h4></div>')

    //Ocultamos el bloque de summary

    $("#hideSubtotal").hide()
}

/* -------------------------------------------------------------------------- */
/*                              CESTA DEL HEADER                              */
/* -------------------------------------------------------------------------- */

if (localStorage.getItem('quantProd') != null) {

    $(".quantityBasket").append(localStorage.getItem("quantProd"))
    $(".totalBasket").append(localStorage.getItem("totPrice"))

} else {
    // Inicio los valores a 0
    $(".quantityBasket").append(0)
    $(".totalBasket").append(0)
}



/* -------------------------------------------------------------------------- */
/*                       AGREGRA PRODUCTOS LOCAL STORAGE                      */
/* -------------------------------------------------------------------------- */
$("#addLocalStorage").click(function () {

    // OBTENGO LOS VALORES QUE TENEMOS EN DIFERENTES ATRIBUTOS DEL BOTON ADD TO CART
    var id = $(this).attr("idProductLS");
    var name = $(this).attr("nameLS");
    var imageRute = $(this).attr("imageLS");
    // var offer = $(this).attr("offerLS");
    var priceOneUnit = $(this).attr("priceOneUnit");
    // var discount = $(this).attr("discountLS");
    var priceOffer = $(this).attr("priceLS");
    var weight = $(this).attr("weigthLS");
    var weightOneUnit = $(this).attr("weightOneUnit");
    var quantity ="1"


    //AÑADIMOS A UN ARRAY TODOS LOS VALORES

    if (productStorage == null) {

        productStorage = []

    } else {

        productStorage.concat(localStorage.getItem("listOfProducts"))
    }
    productStorage.push({
        "id": id,
        "name": name,
        "image": imageRute,
        // "offer":offer,
        "priceOneUnit":priceOneUnit,
        // "discount":discount,
        "priceOffer": priceOffer,
        "weight": weight,
        "weightOneUnit": weightOneUnit,
        "quantity": quantity 
    })


    localStorage.setItem('listOfProducts', JSON.stringify(productStorage));

    /* -------------------- Mando una alerta de confirmacion -------------------- */
    alertify
        .alert('PRODUCT WAS ADDED TO SHOPPING CART', 'Go to cart to checkout')






    /* -------------------------------------------------------------------------- */
    /*                      ACTUALIZAR EL CARRITO DEL HEADER                      */
    /* -------------------------------------------------------------------------- */

    var numProducts = Number($(".quantityBasket").html()) + 1
    // to fixed sirve para limitar los decimales en dos ejem 99.87, solo muestra dos decimales
    var totalPrice = (Number($(".totalBasket").html()) + Number(priceOffer)).toFixed(2)

    $(".quantityBasket").html(numProducts);
    $(".totalBasket").html(totalPrice);

    localStorage.setItem('quantProd', numProducts);
    localStorage.setItem('totPrice', totalPrice);
});






/* -------------------------------------------------------------------------- */
/*                    ELIMINAR PRODUCTOS DEL LOCAL STORAGE                    */
/* -------------------------------------------------------------------------- */
$(".removeItem").click(function () {

    /* ---------------------- Elimino del html el producto ---------------------- */
    $(this).parent().parent().remove();

    // sumTotalPrices()

    /* -------------------------------------------------------------------------- */
    /*           TOMO LOS VALORES DE LOS PRODUCTOS QUE HAY EN EL CARRITO (SELECTORES), devolviendo varios obajetos en un array       */
    /* -------------------------------------------------------------------------- */

    var id = $(".listProdShopp button")
    var imageRute = $(".listProdShopp img")
    var name = $(".listProdShopp .nameShopCart ")
    var price = $(".listProdShopp .priceShopCart strong")
    var priceOneUnit = $(".listProdShopp input")
    var weight = $(".listProdShopp .weightTotal strong")
    var weightOne = $(".listProdShopp .weightOneUnit")
    var quantity = $(".listProdShopp .chooseQuantity")

    // Vacio el array de LS, para asi crear un nuevo json en el local storage
    productStorage = []
    // SI EXISTEN PRODUCTOS DENTRO DEL LOCAL STORAGE
    if(id.length != 0){
        sumTotalPrices()
  
        // Recorremos el array para conocer los productos que todavia no se han eliminado, para poder crear un nuevo array en el local
        // storage
    for (var i = 0; i < id.length; i++) {

       
        // Almaceno en nuevas varibles los valores que tienen los productos en el html de arriba
        var idValue = $(id[i]).attr('idProduct')
        var nameValue = $(name[i]).html()
        var imageValue = $(imageRute[i]).attr('src')
        var priceValue = $(price[i]).html()
        var priceOneUnitValue = $(priceOneUnit[i]).attr('priceOneUnit')
        var weightValue = $(weight[i]).html()
        var weightOneUnit = $(weightOne[i]).html()
        var quantityValue =$(quantity[i]).val()

        // console.log(weightValue);




        productStorage.push({
                "id": idValue,
                "name": nameValue,
                "image": imageValue,
                "priceOffer": priceValue,
                "priceOneUnit": priceOneUnitValue,
                "weight": weightValue,
                "weightOneUnit":weightOneUnit,
                "quantity":quantityValue

        })
        localStorage.setItem('listOfProducts', JSON.stringify(productStorage));

    }
    }
    //SI SE HAN ELIMINADO TODOS LOS PRODUCTOS DEL CARRITO DE COMPRA, ELIMINAMOS EL ITEM DEL LOCAL STORAGE
    else{
      localStorage.removeItem("listOfProducts")

      //Reinicio los valores del carrito
      localStorage.setItem('quantProd', '0');
      localStorage.setItem('totPrice', '0');

      //Actualizo los valores del carrito con los nuevos valores
      $(".quantityBasket").html(localStorage.getItem("quantProd"))
      $(".totalBasket").html(localStorage.getItem("totPrice"))
   
    $('#listProdShopp').append('<div style="margin-left:20px;"><h4>Your shopping cart is empty...</h4></div>')

    //Ocultamos el bloque de summary

    $("#hideSubtotal").hide()
}

})



/* -------------------------------------------------------------------------- */
/*            CALCULAR EL PRECIO Y EL PESO TRAS INCREMENTO DE UNIDADES                    */
/* -------------------------------------------------------------------------- */

$(document).on("change", ".chooseQuantity", function() {  
    var quantity = $(this).val()

    var price = $(this).attr('priceOneUnit')
    var id = $(this).attr('idQuanti')
    var weight = $(this).attr('one')
    
    //Mando imprimir en el html el resultado de el incremento de unidades seleccionadas

    $(".priceQuanti" + id).html('<strong>' + (quantity * price).toFixed(2) + '</strong>')

     //Mando imprimir en el html el resultado de el incremento de unidades seleccionadas

     $(".weight" + id).html('<strong>' + (quantity * weight).toFixed(2) + '</strong>')


     
    /*           TOMO LOS VALORES DE LOS PRODUCTOS QUE HAY EN EL CARRITO          */  

    var id = $(".listProdShopp button")
    var imageRute = $(".listProdShopp img")
    var name = $(".listProdShopp .nameShopCart ")
    var price = $(".listProdShopp .priceShopCart strong")
    var priceOneUnit = $(".listProdShopp input")
    var weight = $(".listProdShopp .weightTotal strong")
    var weightOne = $(".listProdShopp .weightOneUnit")
    var quanti = $(".listProdShopp .chooseQuantity ")
    
    //Reinicio del array para el LS
    productStorage = []

    for (var i = 0; i < id.length; i++) {
    
        // Almaceno en nuevas varibles los valores que tienen los productos en el html de arriba
       

        var idValue = $(id[i]).attr('idProduct')
        var nameValue = $(name[i]).html()
        var imageValue = $(imageRute[i]).attr('src')
        var priceValue = $(price[i]).html()
        var priceOneUnitValue = $(priceOneUnit[i]).attr('priceOneUnit')
        var weightValue = $(weight[i]).html()
        var weightOneUnit = $(weightOne[i]).html()
        var quantityValue =$(quanti[i]).val()

        productStorage.push({
                "id": idValue,
                "name": nameValue,
                "image": imageValue,
                "priceOffer": priceValue,
                "priceOneUnit": priceOneUnitValue,
                "weight":weightValue,
                "weightOneUnit":weightOneUnit,
                "quantity":quantityValue

        })
        localStorage.setItem('listOfProducts', JSON.stringify(productStorage));

    }    
    sumTotalPrices()
   
});




/* -------------------------------------------------------------------------- */
/*                           SUMA TOTAL DEL CARRITO                           */
/* -------------------------------------------------------------------------- */

function sumTotalPrices(){

    /* -------------------------------- SUBTOTAL -------------------------------- */

   var total =  $(".listProdShopp .priceShopCart strong");
//    console.log(total.html());
   var arraySum =[]

    for( var i =0; i<total.length;i++){ 

       var sumTotal = $(total[i]).html()

    // Inserto dentro del array los elementos del ciclo for
       arraySum.push(Number(sumTotal))
    
    }
    // FUNCION PARA SUMAR LOS ELEMENTOS DENTRO DE UN ARRAY
    var reducer = (accumulator, curr) => accumulator + curr;

    var priceSubtotal = arraySum.reduce(reducer)
    
    $(".priceSubtotal").html("<h5>Subtotal:</h5><span class='spanCheckout pull-right'><strong>"+priceSubtotal.toFixed(2)+"€</strong> </span>")
   
    /* -------------------------------- DELIVERY -------------------------------- */
    var weightTotal = $(".weightTotal strong")   
    var sumWeigth=[]

    for(var i=0; i < weightTotal.length; i++){    

        var weight = $(weightTotal[i]).html()
        sumWeigth.push(Number(weight));
    }
    var priceDelivery = sumWeigth.reduce(reducer) 
    /* ----------------- IMPRIMO EL PESO DE TODOS LOS PRODUCTOS ----------------- */
    $(".weightDelivery").html("<h5>Weight:</h5><span class='spanCheckout pull-right'><strong>"+priceDelivery.toFixed(2)+" Kg</strong> </span>")
    
    /* --------------------- CONIDICION PARA PRECIO DE ENVIO -------------------- */
    if(priceDelivery <= 1){
        priceDelivery = 5
        $(".priceDelivery").html("<h5>Delivery:</h5><span class='spanCheckout pull-right'><strong>"+priceDelivery+"€</strong> </span>")
    }
    else if(priceDelivery > 1 && priceDelivery < 5){
        priceDelivery = 10
        $(".priceDelivery").html("<h5>Delivery:</h5><span class='spanCheckout pull-right'><strong>"+priceDelivery+"€</strong> </span>")
    }
    else{
        priceDelivery=20
        $(".priceDelivery").html("<h5>Delivery:</h5><span class='spanCheckout pull-right'><strong>"+priceDelivery+"€</strong> </span>")
    }
    }



/* -------------------------------------------------------------------------- */
/*      SI ESTAMOS DENTRO DEL CARRITO DE COMPRAS, LLAMAMOS A LAS FUNCION      */
/* -------------------------------------------------------------------------- */
if(window.location == 'http://localhost/PROYECTOS/SistemaEcommercePHP/ecommerceApp/shoppingCart'){
sumTotalPrices()
}
if (localStorage.getItem("listOfProducts") != null){
    sumTotalPrices()
}

