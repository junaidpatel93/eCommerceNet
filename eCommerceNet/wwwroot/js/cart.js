
async function removeCartItem(productId){
  data = {productID: productId}
  var result = await fetch('http://localhost:5000/removeCartItem', {
      method: 'POST',
      mode: 'cors',
      body:JSON.stringify(data),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'userID': 'JP93'
      }
    });
  let response = await result.text();
  let productsList = JSON.parse(response);
  generateCartList(productsList)
}

async function updateProductQuantity(quantity,productID){
	data = { quantity: quantity, productID: productID}
  var result = await fetch('http://localhost:5000/UpdateQuantity', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'userID': 'JP93'
        }
    });
  let response = await result.text();
  let productsList = JSON.parse(response);
  generateCartList(productsList)
}

async function loadCart() {
    var result = await fetch('http://localhost:5000/getCartItems', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'userID': 'JP93'
        }
    });
    let response = await result.text();
    let productsList = JSON.parse(response);
    generateCartList(productsList)
}

function generateCartList(productsList){
  $("#table_body").html('');
  let table = $(".cart-table table")
  productsList['items'].forEach(product => {
     var NewProduct = $(`
      <tr id="cart_Product_${product.productID}">
        <td class="cart_product_image" data-th="Image">
        <a href="#"><img src="${product.imageLink}" alt="Image"></a></td>
        <td class="cart_product_name" data-th="Product Name">
        <a href="#">${product.prodName}</a></td>
        <td class="cart_product_quantity" data-th="Quantity"><input type="number" onChange="updateProductQuantity(this.value,'${product.id}');" min="0" value=${product._collection} name="" class="styler">
          &nbsp;
          &nbsp;<a onclick="removeCartItem('${product.id}')" href="#"><i class="icon-trash icon-large"></i> </a>
        </td>
        <td class="cart_product_total" data-th="Total">$ ${product.salePrice}</td>
      </tr>
    `);
    NewProduct.appendTo($('#table_body'));
    })
    if (productsList['items'] == 0) {
        $('#checkoutButton').attr('disabled', true);
    } else {
        $('#checkoutButton').attr('disabled', false);
    }
    $('#total_cost').html("$ " + productsList['totalAmount']['grandTotal']);
}

async function updateCartAddress() {
    let address = $('#address-cart').val();
    data = { cartAddress: address };
    if (address) {
        var result = await fetch('http://localhost:5000/updateCartAddress', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
        let response = await result.text();
        let loginResponse = JSON.parse(response);
        if (loginResponse.success) {
            alert("Congratulations! Order Accepted!");
            $('#header-change-pass-close').click();
            $('#profileDis').removeClass("disabledTab");
            $('#header-login').addClass("hide");
            $('#header-signup').addClass("hide");
            $('#header-logout').removeClass("hide");
            $('#header-change-password').removeClass("hide");
            location.replace("index.html");
            getUser();
        }
    } else {
        alert("Enter the address");
    }
}
loadCart()

