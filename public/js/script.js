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

const hiddenMenu = document.querySelectorAll('#menuElement');
const dropDownMenu = document.querySelector('.menuBtn');
const hiddenCategory = document.querySelectorAll('.menuDisplay ul ul');
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
      if (popup.matches('.upPopup')) {
        popup.classList.replace('upPopup', 'downPopup');
      }
      console.log('menu unwrapped and login popup hidden')
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
╔═╗╔═╗╔═╗╦ ╦╔═╗  ╦  ╔═╗╔═╗╦╔╗╔
╠═╝║ ║╠═╝║ ║╠═╝  ║  ║ ║║ ╦║║║║
╩  ╚═╝╩  ╚═╝╩    ╩═╝╚═╝╚═╝╩╝╚╝
*/

const loginBtn = document.querySelector('.loginButton');
const popup = document.querySelector('#popup');
const unPopup = document.querySelector('.cross');
const menuIcon = document.querySelector('.menuIcon')

loginBtn.onclick = function () {
  popup.classList.replace('downPopup', 'upPopup');
  console.log('login section visible')
}

unPopup.onclick = function () {
  popup.classList.replace('upPopup', 'downPopup')
  console.log('login section hidden')
}


/*
 ██████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███████╗███████╗███████╗██╗         ██████╗  █████╗ ██████╗ ████████╗██╗ █████╗ ██╗     
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝██╔════╝██╔════╝██║         ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔══██╗██║     
██║     ███████║██████╔╝██████╔╝██║   ██║██║   ██║███████╗███████╗█████╗  ██║         ██████╔╝███████║██████╔╝   ██║   ██║███████║██║     
██║     ██╔══██║██╔══██╗██╔══██╗██║   ██║██║   ██║╚════██║╚════██║██╔══╝  ██║         ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██╔══██║██║     
╚██████╗██║  ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████║███████║███████╗███████╗    ██║     ██║  ██║██║  ██║   ██║   ██║██║  ██║███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝                                                                                                                      
*/

function btnVisibility() {
  if (depPoint == -nbr+1) {
    leftBtn.style.visibility = "hidden";
  } else {
    leftBtn.style.visibility = "visible";
  }
  if (depPoint == 0) {
    rightBtn.style.visibility = "hidden";
  } else {
    rightBtn.style.visibility = "visible";
  }
}

document.body.onload = function() {

  nbr = 5;
  depPoint = 0;
  container = document.querySelector('#carrousel');
  leftBtn = document.querySelector('#leftBtn');
  rightBtn = document.querySelector('#rightBtn');
  container.style.width = (1280*nbr)+"px";

  for (i=1; i<=nbr; i++) {
    div = document.createElement ("div");
    div.className = "photo";
    div.style.backgroundImage = "url('/images/image"+i+".jpg')";
    container.appendChild(div);
  }
}

leftBtn.onclick = function() {
  if(depPoint > -nbr+1) {
    depPoint--;
    container.style.transform = "translate("+depPoint*1280+"px)";
    container.style.transition = "all 0.5s ease";
    btnVisibility()
  }
}

rightBtn.onclick = function() {
  if(depPoint < 0) {
    depPoint++;
    container.style.transform = "translate("+depPoint*1280+"px)";
    container.style.transition = "all 0.5s ease";
    btnVisibility()
  }
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

/*
╔╦╗╦ ╦╔═╗╔═╗  ╔═╗╔═╗  ╔═╗╦ ╦╔═╗╔╦╗╔═╗╔╦╗╔═╗╦═╗
 ║ ╚╦╝╠═╝║╣   ║ ║╠╣   ║  ║ ║╚═╗ ║ ║ ║║║║║╣ ╠╦╝
 ╩  ╩ ╩  ╚═╝  ╚═╝╚    ╚═╝╚═╝╚═╝ ╩ ╚═╝╩ ╩╚═╝╩╚═
*/

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
  axios.post('/product_admin/validate/product', {
    productName: 'productName',
    exVat: 'exVat',
    vat: 'vat',
    packagingSize: {
      length : 'packagingSize_length',
      width: 'packagingSize_width',
      height: 'packagingSize_height',
      weight: 'packagingSize_weight'
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
  axios.post('/product_admin/validate/product', {
    productName: 'productName',
    exVat: 'exVat',
    vat: 'vat',
    packagingSize: {
      length : 'packagingSize_length',
      width: 'packagingSize_width',
      height: 'packagingSize_height',
      weight: 'packagingSize_weight'
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



