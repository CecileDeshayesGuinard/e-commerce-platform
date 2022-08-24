/*
███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗ 
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝ 
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║     
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝                                            
*/


const typeOfCustomer = document.querySelector('#typeOfCustomer');
const companyProfile = document.querySelector('#companyProfile');
const userProfile = document.querySelector('#userProfile');
const billingAdress = document.querySelector('#billingAdress');
const security = document.querySelector('#security');

const individualButton = document.querySelector('#individual');
const companyButton = document.querySelector('#company');

const continueCompany = document.querySelector('#continueCompany');
const previousCompany = document.querySelector('#previousCompany');
const continueUser = document.querySelector('#continueUser');
const previousUser = document.querySelector('#previousUser');d
const continueAdress = document.querySelector('#continueAdress');
const previousAdress = document.querySelector('#previousAdress');
const registration = document.querySelector('#registration');
const previousPassword = document.querySelector('#previousPassword');

/*
╔╦╗╦ ╦╔═╗╔═╗  ╔═╗╔═╗  ╔═╗╦ ╦╔═╗╔╦╗╔═╗╔╦╗╔═╗╦═╗
 ║ ╚╦╝╠═╝║╣   ║ ║╠╣   ║  ║ ║╚═╗ ║ ║ ║║║║║╣ ╠╦╝
 ╩  ╩ ╩  ╚═╝  ╚═╝╚    ╚═╝╚═╝╚═╝ ╩ ╚═╝╩ ╩╚═╝╩╚═
*/


individualButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}

companyButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  companyProfile.classList.remove('hidden-block');
}


/*
╔═╗╔═╗╔╦╗╔═╗╔═╗╔╗╔╦ ╦
║  ║ ║║║║╠═╝╠═╣║║║╚╦╝
╚═╝╚═╝╩ ╩╩  ╩ ╩╝╚╝ ╩ 
*/


continueCompany.onclick = function () {
  companyProfile.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}

previousCompany.onclick = function () {
  companyProfile.classList.add('hidden-block');
  typeOfCustomer.classList.remove('hidden-block');
}


/*
╦ ╦╔═╗╔═╗╦═╗
║ ║╚═╗║╣ ╠╦╝
╚═╝╚═╝╚═╝╩╚═
*/


continueUser.onclick = function () {
  userProfile.classList.add('hidden-block');
  billingAdress.classList.remove('hidden-block');
  axios.post('/signup/validate/user', {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    dateOfBirth: 'dateOfBirth',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

previousUser.onclick = function () {
  userProfile.classList.add('hidden-block');
  typeOfCustomer.classList.remove('hidden-block');
}


/*
╔╗ ╦╦  ╦  ╦╔╗╔╔═╗  ╔═╗╔╦╗╦═╗╔═╗╔═╗╔═╗
╠╩╗║║  ║  ║║║║║ ╦  ╠═╣ ║║╠╦╝║╣ ╚═╗╚═╗
╚═╝╩╩═╝╩═╝╩╝╚╝╚═╝  ╩ ╩═╩╝╩╚═╚═╝╚═╝╚═╝
*/


continueAdress.onclick = function () {
  billingAdress.classList.add('hidden-block');
  security.classList.remove('hidden-block');
  axios.post('/signup/validate/address', {
    countryName: 'countryName',
    streetName: 'streetName',
    streetNumber: 'streetNumber',
    zipCode: 'zipCode',
    cityName: 'cityName',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

previousAdress.onclick = function () {
  billingAdress.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
}


/*
╔═╗╔═╗╔═╗╦ ╦╦═╗╦╔╦╗╦ ╦
╚═╗║╣ ║  ║ ║╠╦╝║ ║ ╚╦╝
╚═╝╚═╝╚═╝╚═╝╩╚═╩ ╩  ╩ 
*/


registration.onclick = function () {
  security.classList.add('hidden-block');
  axios.post('/signup/validate/password', {
    password: password,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

previousPassword.onclick = function () {
  security.classList.add('hidden-block');
  billingAdress.classList.remove('hidden-block');
}