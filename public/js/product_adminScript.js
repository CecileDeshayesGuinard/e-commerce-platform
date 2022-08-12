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

otherPhotosInput.addEventListener('change', (e) => {
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