function finish() {
    document.getElementById('finish').hidden = false;    
    document.getElementById('finish').innerHTML = 'Klaar';    
    document.getElementById('go').hidden = true;
}

var form = document.getElementById('form');
items.forEach((item, index) => {
    console.log(item);
    var template = document.getElementById("item-template");
    var clone = template.cloneNode(true);
    clone.hidden = false;
    clone.dataset.price = item.price;
    clone.dataset.quantity = 0;
    clone.childNodes[1].childNodes[1].childNodes[1].src = item.url;
    clone.childNodes[1].childNodes[3].childNodes[1].innerHTML = item.name + " (" + item.amount + ")";
    clone.childNodes[1].childNodes[3].childNodes[3].innerHTML = "0.00 EURO";
    clone.childNodes[7].name = item.name + " (" + item.amount + ")";
    clone.childNodes[7].hidden = true
    document.getElementById("list").appendChild(clone);
})

document.getElementById("item-template").remove()


$('.plus').click(function() {
    var product = $(this).closest('.product')
    var q = product.data('quantity') + 1;
    product.data('quantity', q);
    product[0].childNodes[7].value = q
    updateProduct(product);
});

$('.minus').click(function() {
    var product = $(this).closest('.product');
    var q = Math.max(0, product.data('quantity') - 1);
    product.data('quantity', q);
    product[0].childNodes[7].value = q;
    updateProduct(product);
});

$('.del').click(function() {
    var product = $(this).closest('.product');
    //product[0].hidden = true;
    product[0].childNodes[7].value = 0;
    product.data('quantity', 0);
    updateProduct(product);
});

function updateProduct(product) {
    var quantity = product.data('quantity');
    var price = product.data('price');
    $('.product-quantity', product).text('x' + quantity);
    $('.product-price', product).text((price * quantity).toFixed(2) + " EURO");
    updateBill();
}

function updateBill() {
    var subtotal = 0;
    var discount = 0;
    var total = 0;
    $('.product').each(function() {
        subtotal += $(this).data('quantity') * $(this).data('price');
    });
    discount = subtotal * 0.3;
    total = subtotal - discount;
    $('.subtotal .value').text(subtotal.toFixed(2) + " EURO");
    $('.discount .value').text(discount.toFixed(3) + " EURO");
    $('.total .value').text(total.toFixed(3) + " EURO");
}