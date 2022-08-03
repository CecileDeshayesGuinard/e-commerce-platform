document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("e-commerce-platform JS imported successfully!");
  },
  false
);

/*
███╗   ███╗███████╗███╗   ██╗██╗   ██╗
████╗ ████║██╔════╝████╗  ██║██║   ██║
██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝                                     
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
  // non, le 2e parametre, n'est pas bon pour axios, il faut consulter la doc
  axios.post('/validate/user', function (req, res, next) {
    const errors = validateUser(req)
  
    if (errors.length >= 1) {
      res.json(errors)
    }
  })
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
  axios.post('/validate/address', function (req, res, next) {
    const errors = validateAddress(req)
  
    if (errors.length >= 1) {
      res.json(errors)
    }
  })
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
  axios.post('/validate/password', function (req, res, next) {
    const errors = validatePassword(req)
  
    if (errors.length >= 1) {
      res.json(errors)
    }
  })
}

previousPassword.onclick = function () {
  security.classList.add('hidden-block');
  billingAdress.classList.remove('hidden-block');
}