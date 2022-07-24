document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("e-commerce-platform JS imported successfully!");
  },
  false
);


// GESTION GENERALE DU MENU DEROULANT
const hiddenMenu = document.querySelectorAll('#menu-zone div');
const dropDownMenu = document.querySelector('#menuHamburger');
const hiddenCategory = document.querySelectorAll('#menu-zone ul ul');
const dropDownCategory = document.querySelector('#category-menu');

//GESTION DU MENU PRINCIPAL
dropDownMenu.onclick = function () {
  hiddenMenu.forEach(function(div) {
    if (div.matches('.wrapped-menu')) {
      div.classList.replace('wrapped-menu', 'unwrapped-menu')
      console.log('menu unwrapped')
    }
    else {
      if (div.matches('.unwrapped-menu')) {
      div.classList.replace('unwrapped-menu', 'wrapped-menu')
      console.log('menu wrapped')
      }
    }
  })
}

// GESTION DU SOUS MENU CATEGORIES
dropDownCategory.onclick = function () {
  hiddenCategory.forEach(function(ul) {
    if (ul.matches('.cat-hidden')) {
      ul.classList.replace('cat-hidden', 'cat-visible')
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




