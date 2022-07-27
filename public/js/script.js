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
███╗   ███╗ █████╗ ██╗███╗   ██╗     ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗
████╗ ████║██╔══██╗██║████╗  ██║    ██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝
██╔████╔██║███████║██║██╔██╗ ██║    ██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗
██║╚██╔╝██║██╔══██║██║██║╚██╗██║    ██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║
██║ ╚═╝ ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝                                                                                                            
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
███████╗███████╗ ██████╗ ██████╗ ███╗   ██╗██████╗      ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗
██╔════╝██╔════╝██╔════╝██╔═══██╗████╗  ██║██╔══██╗    ██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝
███████╗█████╗  ██║     ██║   ██║██╔██╗ ██║██║  ██║    ██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗
╚════██║██╔══╝  ██║     ██║   ██║██║╚██╗██║██║  ██║    ██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║
███████║███████╗╚██████╗╚██████╔╝██║ ╚████║██████╔╝    ╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║
╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝      ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
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




