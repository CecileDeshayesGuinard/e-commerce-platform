/*
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗        ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║        ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║        ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║        ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║███████╗██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝                                                                                                      
*/


const createProduct = document.querySelector ('#createProduct');
const editProduct  = document.querySelector ('#editProduct');
const deleteProduct = document.querySelector ('#deleteProduct');


/*
╔═╗╔╦╗╦╔╦╗
║╣  ║║║ ║ 
╚═╝═╩╝╩ ╩ 
*/


editProduct.onclick = function () {
    axios.post('/admin_product/new/validate/product', {
      productName: 'productName',
      exVat: 'exVat',
      vat: 'vat',
      packagingSize_length: 'packagingSize_length',
      packagingSize_width: 'packagingSize_width',
      packagingSize_height: 'packagingSize_height',
      packagingSize_weight: 'packagingSize_weight'
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

otherPhotosInput.addEventListener('change', (e) => {
    const files = otherPhotosInput.files;

    if (files.length > 3) {
        alert(`Vous ne pouvez importer que 3 photos secondaires !`);
        return;
    }
});