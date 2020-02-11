function checkBeforeSubmit() {
    document.getElementById('success').innerHTML = 'Submitted';
}

function finish() {
    document.getElementById('success').innerHTML = 'Klaar';
    document.getElementById('finish').innerHTML = '';
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
    clone.childNodes[1].childNodes[3].childNodes[3].innerHTML = "0 EURO";
    clone.childNodes[7].name = item.name + " (" + item.amount + ")";
    clone.childNodes[7].hidden = true
    document.getElementById("list").appendChild(clone);
})

document.getElementById("item-template").remove()


/*$('.cart-container').on('mousemove', function(evt) {
    var windowWidth = $(window).width();
    var cartWidth = $('.product').length * 200;
    if (windowWidth < cartWidth)
        $('.cart').stop(false, true).animate({
            left: -(evt.clientX / windowWidth) * (cartWidth - windowWidth)
        });
    else
        $('.cart').stop(false, true).css({
            left: 0
        });
});*/

$('.plus').click(function() {
    var product = $(this).closest('.product')
    var q = product.data('quantity') + 1;
    product.data('quantity', q);
    product[0].childNodes[7].value = q
    updateProduct(product);
});

$('.minus').click(function() {
    var product = $(this).closest('.product')
    var q = Math.max(0, product.data('quantity') - 1);
    product.data('quantity', q);
    product[0].childNodes[7].value = q
    updateProduct(product);
});

$('.del').click(function() {
    var product = $(this).closest('.product')
    product[0].hidden = true
    product[0].childNodes[7].value = 0
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
    var salestax = 0;
    var total = 0;
    $('.product').each(function() {
        subtotal += $(this).data('quantity') * $(this).data('price');
    });
    salestax = subtotal * 0.2;
    total = subtotal - salestax;
    $('.subtotal .value').text(subtotal.toFixed(2) + " EURO");
    $('.salestax .value').text(salestax.toFixed(2) + " EURO");
    $('.total .value').text(total.toFixed(2) + " EURO");
}