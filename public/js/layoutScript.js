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