/*
███████╗██████╗ ██╗████████╗     █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
██╔════╝██╔══██╗██║╚══██╔══╝    ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
█████╗  ██║  ██║██║   ██║       ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
██╔══╝  ██║  ██║██║   ██║       ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
███████╗██████╔╝██║   ██║       ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
╚══════╝╚═════╝ ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝                                                                                      
*/

 const editForm = document.querySelector('#edit_form')

const typeOfCustomer = document.querySelector('#typeOfCustomer');
const companyProfile = document.querySelector('#companyProfile');
const userProfile = document.querySelector('#userProfile');
const billingAdress = document.querySelector('#billingAdress');
const security = document.querySelector('#security');

const edit_individualButton = document.querySelector('#edit_individual');
const edit_companyButton = document.querySelector('#edit_company');

const edit_continueCompany = document.querySelector('#edit_continueCompany');
const edit_previousCompany = document.querySelector('#edit_previousCompany');
const edit_continueUser = document.querySelector('#edit_continueUser');
const edit_previousUser = document.querySelector('#edit_previousUser');
const edit_continueAdress = document.querySelector('#edit_continueAdress');
const edit_previousAdress = document.querySelector('#edit_previousAdress');
const edit_registration = document.querySelector('#edit_registration');
const edit_previousPassword = document.querySelector('#edit_previousPassword');

/*
╔╦╗╦ ╦╔═╗╔═╗  ╔═╗╔═╗  ╔═╗╦ ╦╔═╗╔╦╗╔═╗╔╦╗╔═╗╦═╗
 ║ ╚╦╝╠═╝║╣   ║ ║╠╣   ║  ║ ║╚═╗ ║ ║ ║║║║║╣ ╠╦╝
 ╩  ╩ ╩  ╚═╝  ╚═╝╚    ╚═╝╚═╝╚═╝ ╩ ╚═╝╩ ╩╚═╝╩╚═
*/

let userValid = false
let adressValid = false
let passwordValid = false

editForm.addEventListener('submit', function (event) {
    if (!passwordValid || !adressValid || !userValid) {
        event.preventDefault() // empeche la soumission du form, tant que tout n'est pas valide!
    }
})

edit_individualButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}

edit_companyButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  companyProfile.classList.remove('hidden-block');
}

/*
╔═╗╔═╗╔╦╗╔═╗╔═╗╔╗╔╦ ╦
║  ║ ║║║║╠═╝╠═╣║║║╚╦╝
╚═╝╚═╝╩ ╩╩  ╩ ╩╝╚╝ ╩ 
*/

edit_continueCompany.onclick = function () {
  companyProfile.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}

edit_previousCompany.onclick = function () {
  companyProfile.classList.add('hidden-block');
  typeOfCustomer.classList.remove('hidden-block');
}

/*
╦ ╦╔═╗╔═╗╦═╗
║ ║╚═╗║╣ ╠╦╝
╚═╝╚═╝╚═╝╩╚═
*/

edit_continueUser.onclick = function () {
  userProfile.classList.add('hidden-block');
  billingAdress.classList.remove('hidden-block');
  axios.post('/:id/account/validate/user', {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    dateOfBirth: 'dateOfBirth',
  })
  .then(function (response) {
    console.log(response);
    userValid = true // ici plutot
  })
  .catch(function (error) {
    console.log(error);
  });
}

edit_previousUser.onclick = function () {
  userProfile.classList.add('hidden-block');
  typeOfCustomer.classList.remove('hidden-block');
}

/*
╔╗ ╦╦  ╦  ╦╔╗╔╔═╗  ╔═╗╔╦╗╦═╗╔═╗╔═╗╔═╗
╠╩╗║║  ║  ║║║║║ ╦  ╠═╣ ║║╠╦╝║╣ ╚═╗╚═╗
╚═╝╩╩═╝╩═╝╩╝╚╝╚═╝  ╩ ╩═╩╝╩╚═╚═╝╚═╝╚═╝
*/

edit_continueAdress.onclick = function () {
  billingAdress.classList.add('hidden-block');
  security.classList.remove('hidden-block');
  axios.post('/:id/account/validate/address', {
    countryName: 'countryName',
    streetName: 'streetName',
    streetNumber: 'streetNumber',
    zipCode: 'zipCode',
    cityName: 'cityName',
  })
  .then(function (response) {
    console.log(response);
    adressValid = true // ici plutot
  })
  .catch(function (error) {
    console.log(error);
  });
}

edit_previousAdress.onclick = function () {
  billingAdress.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}

/*
╔═╗╔═╗╔═╗╦ ╦╦═╗╦╔╦╗╦ ╦
╚═╗║╣ ║  ║ ║╠╦╝║ ║ ╚╦╝
╚═╝╚═╝╚═╝╚═╝╩╚═╩ ╩  ╩ 
*/

edit_registration.onclick = function () {
  security.classList.add('hidden-block');
  axios.post('/:id/account/validate/password', {
    password: password,
  })
  .then(function (response) {
    console.log(response);
    passwordValid = true // ici plutot
  })
  .catch(function (error) {
    console.log(error);
  });
}

edit_previousPassword.onclick = function () {
  security.classList.add('hidden-block');
  billingAdress.classList.remove('hidden-block');
}