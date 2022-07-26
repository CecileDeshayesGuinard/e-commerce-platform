/*
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗       ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║      ██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║█████╗██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║╚════╝██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║      ╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝       ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝                                                                                                                           
*/


const createCategory = document.querySelector ('#createCategory');
const editCategory  = document.querySelector ('#editCategory');
const deleteCategory = document.querySelector ('#deleteCategory');


/*
╔═╗╦═╗╔═╗╔═╗╔╦╗╔═╗
║  ╠╦╝║╣ ╠═╣ ║ ║╣ 
╚═╝╩╚═╚═╝╩ ╩ ╩ ╚═╝
*/


createCategory.onclick = function () {
  axios.post('/categories_new/validate/category', {
    categoryName: 'categoryName',
    categoryDescription: 'categoryDescription',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}