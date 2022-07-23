document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("e-commerce-platform JS imported successfully!");
  },
  false
);


// Gestion du menu déroulant
const allInvisibleMenu = Array.from(document.querySelectorAll('.wrap-menu'));

const dropDownMenu = document.querySelector('#wrapped-menu');
const invisibleMenu = document.querySelector('.wrap-menu');


allInvisibleMenu.forEach(invisibleMenu => {
  dropDownMenu.onclick = function () {
  invisibleMenu.classList.remove('wrap-menu')
  }
})

/*
window.onclick = function (e) {
  if (!e.target.matches(dropDownMenu)) {
    invisibleMenu.classList.add('wrap-menu')
  }
}
*/




