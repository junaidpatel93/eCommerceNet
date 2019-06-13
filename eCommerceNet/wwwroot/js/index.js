
async function LoadMen() {
    var result = await fetch('http://localhost:5000/getProducts/men', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let response = await result.text();
    let productsList = JSON.parse(response);
    generateProductsList(productsList, '#menProductsList');
}

async function LoadWomen() {
    var result = await fetch('http://localhost:5000/getProducts/women', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let response = await result.text();
    let productsList = JSON.parse(response);
    generateProductsList(productsList, '#womenProductsList');
}

async function LoadKids() {
    var result = await fetch('http://localhost:5000/getProducts/kids', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let response = await result.text();
    let productsList = JSON.parse(response);
    generateProductsList(productsList, '#kidsProductsList');
}

async function addtoCart(product) {

    if (product == '') {
        var url = window.location.search;
        product = url.substring(url.lastIndexOf('=') + 1);
    }
    data = { userID: 'JP93', productID: product, quantity: 1 };
    var result = await fetch('http://localhost:5000/addtoCart', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let response = await result.text();
    let cart = JSON.parse(response);
}

function generateProductsList(products, id) {
    let productsList = $(id);
    productsList.html("");
  products.forEach(product => {
    var NewProducts = $(`
        <li class="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-center">
          <div class="product">
            <figure class="figure-hover-overlay">
              <a href="#"  class="figure-href" onclick="gotoDetails('${product.id}')"></a>
              <img src="${product.imageLink}" alt="Image" class="img-responsive">
              <span class="bar"></span>
              <figcaption>
                <a href="#" class="shop-value" onclick="addtoCart('${product.id}')"><i class="glyphicon glyphicon-shopping-cart"></i></a>
              </figcaption>
            </figure>
            <div class="product-caption" onclick="gotoDetails('${product.id}')">
              <a href="#" class="product-name">${product.prodName}</a>
              <p class="product-price"><span>${product.costPrice}$</span> ${product.salePrice}$</p>
              <div class="product-rating">
              </div>
            </div>
          </div>
        </li> `);
    NewProducts.appendTo(productsList);
  });
}

async function fetchCartItems() {
  var result = await fetch('http://localhost:5000/getCartItems', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  let response = await result.text();
  let cartList = JSON.parse(response);
  createCart(cartList);
}

function createCart(cart) {
  $('#cart_items').html(cart['count'])
  cart['items'].forEach(product => {
    var NewProducts = $(`
     <div class="item pull-left">
      <img src="${product.imageLink}" alt="Product Name" class="pull-left">
      <div class="pull-left">
        <p> ${product.prodName} </p>
        <p>$ ${product.salePrice} &nbsp;<strong>x ${product._collection}</strong></p>
      </div>
      <a href="" class="pull-right"><i class="icon-trash icon-large pull-left"></i></a>
    </div>`);
    NewProducts.appendTo($('.shopping-cart-items'));
    });
    if (cart.count != 0) {
        $('#total_cost').html("$" + cart['totalAmount']['grandTotal']);
    }
	
}
function gotoDetails(productID) {
  if (productID) {
    window.location.href = 'http://localhost:5000/product.html?id=' + productID;
  } else {
    window.location.href = 'http://localhost:5000/index.html';
  }
}
async function onDetailsLoad() {
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
  var result = await fetch('http://localhost:5000/getProductDetails/' + id, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let productsList = JSON.parse(response);
    $('#product-image').attr('src', productsList.product.imageLink);
    $('#product_prodName').html(productsList.product.prodName);
    $('#product_brandName').html(productsList.product.brandName);
    $('#product_collection').html(productsList.product._collection);
    $('#product_costPrice').html(productsList.product.costPrice);
    $('#product_salePrice').html(productsList.product.salePrice);
    $('#product_details').html(productsList.product.details);
}

async function addReview() {
    let comment = $('#reviews-comment').val();
    let rating = $('#reviews-rating').val();
    $("#star2").click(function () {
        $(this).data('clicked', true);
    });
    if ($('#star2').data('clicked')) {
        rating = "1";
    }
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
	data = { 'commentDescription': comment, 'rating': rating || 3, 'userID': 'JP93', 'productID': id };
  var result = await fetch('http://localhost:5000/postComments', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  loadComments();
  $('#reviews-comment').val("");
}
async function loadComments() {
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
  var result = await fetch('http://localhost:5000/getComments/' + id, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let commentsList = JSON.parse(response);
  let users = commentsList.users;
  let productsList = $('#commentsSection');
  productsList.html("");
  commentsList.results.forEach((item) => {
      let user = users.find((u) => { return item.userID == u.id });
      if (user == undefined || user.firstName == null) {
          item['userName'] = "Anonymous";
      } else {
          $('#header-signup').addClass("hide");
          $('#header-login').addClass("hide");
          $('#header-logout').removeClass("hide");
          $('#header-change-password').removeClass("hide");
          item['userName'] = user.firstName + ' ' + user.lastName;
      }
	  var comment = $(`<div class="review-header"> <h5>${item.userName}</h5> <div class="product-rating"> <div class="">Rating : ${item.rating}</div> </div> <div class="review-body"> <p>${item.commentDescription}</p> </div> <hr>`);
    comment.appendTo(productsList);
  });
}
async function login() {
	let email = $('#email-signin').val();
	let password = $('#password-signin').val();
	data = { 'email': email, 'password': password };
	if (email && password) {
		var result = await fetch('http://localhost:5000/login', {
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
            $('#header-login-close').click();
            $('#profileDis').removeClass("disabledTab");
            $('#header-login').addClass("hide");
            $('#header-signup').addClass("hide");
            $('#header-logout').removeClass("hide");
            $('#header-change-password').removeClass("hide");
            getUser();
		}
	}

}
async function register() {
	let email = $('#email-reg').val();
	let password = $('#password-reg').val();
	data = { 'email': email, 'password': password }
	if (email && password) {
		var result = await fetch('http://localhost:5000/register', {
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
            $('#header-signup-close').click();
            $('#header-signup').addClass("hide");
            $('#header-login').addClass("hide");
            $('#header-logout').removeClass("hide");
            $('#header-change-password').removeClass("hide");
            location.replace("profile.html");
			getUser();
		}
	}
}

async function changePassword() {
    let currentPassword = $('#current-pass').val();
    let newPassword = $('#new-pass').val();
    data = { 'currentPassword': currentPassword, 'newPassword': newPassword };
    if (currentPassword && newPassword) {
        var result = await fetch('http://localhost:5000/changePassword', {
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
            
            $('#header-change-pass-close').click();
            $('#profileDis').removeClass("disabledTab");
            $('#header-login').addClass("hide");
            $('#header-signup').addClass("hide");
            $('#header-logout').removeClass("hide");
            $('#header-change-password').removeClass("hide");
            getUser();
        }
    }

}
async function getUser() {
	var result = await fetch('http://localhost:5000/getUser', {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let user = JSON.parse(response);
	if (user.email != "") {
        console.log(user.email);
        $('#header-signup').addClass("hide");
        $('#header-login').addClass("hide");
        $('#header-logout').removeClass("hide");
        $('#header-change-password').removeClass("hide");
        $('#user-details').html(user.email);
        $('#profileDis').removeClass("disabledTab");
    }
}

function logout() {
    sessionStorage.clear();
    //location.reload.cache.clear("index.html");
}