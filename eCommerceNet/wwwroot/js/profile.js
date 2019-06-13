async function getUserDetails() {
	var result = await fetch('http://localhost:5000/getUserDetails', {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let user = JSON.parse(response);
	if (user) {
        $('#pr_firstName').val(user.firstName || '');
        $('#pr_lastName').val(user.lastName || '');
        $('#pr_email').val(user.email || '');
        $('#pr_phone').val(user.phone || '');
        $('#pr_address').val(user.address || '');
        $('#pr_postalCode').val(user.postalCode || '');
        $('#pr_country').val(user.country);
        $('#pr_province').val(user.province);
    }
    if (user.address == "") {
        $('#address-show').removeClass("hide");
    } else {
        $('#address-show').addClass("hide");
    }
}
async function updateProfile() {
    let firstName = $('#pr_firstName').val();
    let lastName = $('#pr_lastName').val();
    let email = $('#pr_email').val();
    let phone = $('#pr_phone').val();
    let address = $('#pr_address').val();
    let postalCode = $('#pr_postalCode').val();
    let country = $('#pr_country').val();
    let province = $('#pr_province').val();
    details = { 'email': email, 'address': address, 'firstName': firstName, 'lastName': lastName, 'phone': phone, 'postalcode': postalCode, 'country': country, 'province': province }
	var result = await fetch('http://localhost:5000/updateProfile', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
        body: JSON.stringify(details),
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let loginResponse = JSON.parse(response);
    if (loginResponse.success) {
        $('#header-signup').addClass("hide");
        $('#header-login').addClass("hide");
        $('#header-logout').removeClass("hide");
        $('#header-change-password').removeClass("hide");
        alert("User Details Updated");
	}
}