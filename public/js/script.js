document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("e-commerce-platform JS imported successfully!");
  },
  false
);

/*
██╗      █████╗ ██╗   ██╗ ██████╗ ██╗   ██╗████████╗     ██╗███╗   ███╗███████╗███╗   ██╗██╗   ██╗██╗ 
██║     ██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝    ██╔╝████╗ ████║██╔════╝████╗  ██║██║   ██║╚██╗
██║     ███████║ ╚████╔╝ ██║   ██║██║   ██║   ██║       ██║ ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║ ██║
██║     ██╔══██║  ╚██╔╝  ██║   ██║██║   ██║   ██║       ██║ ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║ ██║
███████╗██║  ██║   ██║   ╚██████╔╝╚██████╔╝   ██║       ╚██╗██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝██╔╝
╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝    ╚═╝        ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝ 
                                                                                                      
*/

const hiddenMenu = document.querySelectorAll('#menu-zone div');
const dropDownMenu = document.querySelector('#menuHamburger');
const hiddenCategory = document.querySelectorAll('#menu-zone ul ul');
const dropDownCategory = document.querySelector('#category-menu');

/*
╔╦╗╔═╗╦╔╗╔  ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗
║║║╠═╣║║║║  ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗
╩ ╩╩ ╩╩╝╚╝  ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝
*/


dropDownMenu.onclick = function () {
  hiddenMenu.forEach(function(div) {
    if (div.matches('.wrapped-menu')) {
      div.classList.replace('wrapped-menu', 'unwrapped-menu')
      console.log('menu unwrapped')
    }
    else {
      if (div.matches('.unwrapped-menu')) {
      div.classList.replace('unwrapped-menu', 'wrapped-menu');
      hiddenCategory.forEach(function(ul) { // nous devons reprendre la function de fermeture des sous catégories pour les reboot, sinon elles restent ouvertes
        if (ul.matches('.cat-visible')) {
          ul.classList.replace('cat-visible', 'cat-hidden')
          console.log('categories are hidden')
        }
      })
      console.log('menu wrapped')
      }
    }
  })
}

/*
╦ ╦╔╗╔╔╦╗╔═╗╦═╗  ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗
║ ║║║║ ║║║╣ ╠╦╝  ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗
╚═╝╝╚╝═╩╝╚═╝╩╚═  ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝
*/

dropDownCategory.onclick = function () {
  hiddenCategory.forEach(function(ul) {
    if (ul.matches('.cat-hidden')) {
      ul.classList.replace('cat-hidden', 'cat-visible');
      console.log('categories are visible')
    }
    else {
      if (ul.matches('.cat-visible')) {
      ul.classList.replace('cat-visible', 'cat-hidden')
      console.log('categories are hidden')
      }
    }
  })
}

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


companyButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  companyProfile.classList.remove('hidden-block');
}

individualButton.onclick = function () {
  typeOfCustomer.classList.add('hidden-block');
  userProfile.classList.remove('hidden-block');
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
  axios.post('signup/validate/user', {
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
  axios.post('signup/validate/adress', {
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
  axios.post('signup/validate/adress', {
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

/*
██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗      █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝     ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║        ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║        ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                                                                                                
*/


const createProduct = document.querySelector ('#createProduct');
const editProduct  = document.querySelector ('#editProduct');
const deleteProduct = document.querySelector ('#deleteProduct');

/*
╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗
║  ╠╦╝║╣ ╠═╣ ║ ║╣ 
╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝
*/

createProduct.onclick = function () {
  axios.post('product_admin/validate/product', {
    productName: 'productName',
    exVat: 'exVat',
    vat: 'vat',
    packagingSize: {
      length : 'length',
      width: 'width',
      height: 'height',
      weight: 'weight'
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

/*
╔═╗╔╦╗╦╔╦╗
║╣  ║║║ ║ 
╚═╝═╩╝╩ ╩ 
*/

editProduct.onclick = function () {
  axios.post('product_admin/validate/product', {
    productName: 'productName',
    exVat: 'exVat',
    vat: 'vat',
    packagingSize: {
      length : 'length',
      width: 'width',
      height: 'height',
      weight: 'weight'
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


/*
╔╦╗╦ ╦╦ ╔╦╗╦╔═╗╦  ╔═╗  ╔═╗╦ ╦╔═╗╔╦╗╔═╗╔═╗  ╔╦╗╔═╗╔╗╔╔═╗╔═╗╔═╗╔╦╗╔═╗╔╗╔╔╦╗
║║║║ ║║  ║ ║╠═╝║  ║╣   ╠═╝╠═╣║ ║ ║ ║ ║╚═╗  ║║║╠═╣║║║╠═╣║ ╦║╣ ║║║║╣ ║║║ ║ 
╩ ╩╚═╝╩═╝╩ ╩╩  ╩═╝╚═╝  ╩  ╩ ╩╚═╝ ╩ ╚═╝╚═╝  ╩ ╩╩ ╩╝╚╝╩ ╩╚═╝╚═╝╩ ╩╚═╝╝╚╝ ╩ 
*/

const otherPhotosInput = document.querySelector('#otherPhotos');

input.addEventListener('change', (e) => {
    const files = otherPhotosInput.files;

    if (files.length > 3) {
        alert(`Vous ne pouvez importer que 3 photos secondaires !`);
        return;
    }
});


/*
╔╦╗╔═╗╦═╗╔═╗╦╔╗╔  ╔╦╗╔═╗╔╗╔╔═╗╔═╗╔═╗╔╦╗╔═╗╔╗╔╔╦╗
║║║╠═╣╠╦╝║ ╦║║║║  ║║║╠═╣║║║╠═╣║ ╦║╣ ║║║║╣ ║║║ ║ 
╩ ╩╩ ╩╩╚═╚═╝╩╝╚╝  ╩ ╩╩ ╩╝╚╝╩ ╩╚═╝╚═╝╩ ╩╚═╝╝╚╝ ╩ 
*/

/*const productMargin = document.querySelector ('#margin');
const costOfProduct = document.querySelector ('#costOfProduct');
const exVatPrice = document.querySelector ('#exVatPrice');
const ValueAddedTaxe = document.querySelector ('#ValueAddedPrice');
const taxedPrice = document.querySelector ('#taxedPrice');
const priceManagementModule = "";*/





/*
 ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗         █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝        ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗        ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║        ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                                                                                                                      
*/



