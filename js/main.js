
 /* Html Attributtes */
var nameinput = document.getElementById("name")
var categoryinput = document.getElementById("category")
var priceinput = document.getElementById("price")
var descriptioninput = document.getElementById("description")
var imageinput = document.getElementById("imageInput")
var productcontainer = document.getElementById("productcontainer")
var searchInput = document.getElementById("searchinput")
var addproduct = document.getElementById("add")
var updateproduct = document.getElementById("update")

 /* App varaibles */
 var updatedindex;
  var nameRegex = /^[A-Z][a-z]{3,}$/;
  var categpryRegex = /^[A-Z][a-z]{3,}$/;
  var priceRegex = /^([1-9][1-9][0-9]|1000)$/;
  var descriptionRegex= /^[a-z\s]{25,100}$/; 

 productlist =  JSON.parse(localStorage.getItem("products")) || [] 
 displayallproduct();

 // if(localStorage.getItem("products") !== null) {
//      productlist = JSON.parse(localStorage.getItem("products"))
//  }
 /* Functions */

 function Addproduct() {

  if(
    validate(nameRegex , nameinput) &&
    validate(categpryRegex , categoryinput) && 
    validate(priceRegex , priceinput) && 
    validate(descriptionRegex , descriptioninput)
  ) {
    var product = {
      name : nameinput.value,
      category:categoryinput.value,
      price:priceinput.value,
      description:descriptioninput.value,
      Imagepath:"./assets/imgs/" + imageinput.files[0].name,
     }
     productlist.push(product);
     localStorage.setItem("products" , JSON.stringify(productlist))
     displayproduct(productlist.length - 1 );
     clearInputs();
   } else {
    alert("fill all inputs")
   }
  }


 function displayproduct(index) {
    var productHtml = 
                `
                 <div class="col-sm-6 col-md-4 col-lg-3">
                       <div class="inner  rounded">
                <img src=${productlist[index].Imagepath} class="w-100" alt="">
                <div class="content d-flex justify-content-between mt-2">
                  <h2 class="h5">${productlist[index].name}</h2>
                  <span>${productlist[index].price}$</span>
                </div>
                <div class="d-flex gap-2 align-items-center">
                  <i class="fa-solid fa-tag"></i>
                  <h3 class="h6">${productlist[index].category}</h3>
                </div>
                <p class="text-secondary">
                ${productlist[index].description}  
                </p>
                <button class="btn btn-outline-warning" onclick="getUpdateinfo(${index})">Update</button>
                <button class=" btn btn-outline-danger"  onclick="deleteproduct(${index})">Delete</button>
               </div>
    `
              
               
    productcontainer.innerHTML += productHtml;
 }

  function  displayallproduct() {
    for(var i = 0 ; i < productlist.length ; i++) {
        displayproduct(i)
    }
  }

  function clearInputs() {
    nameinput.value = "";
    categoryinput.value = "";
    priceinput.value = "";
    descriptioninput.value = "";
    imageinput.value = null;
  }

  function deleteproduct(index) {
    productcontainer.innerHTML = "";
    productlist.splice(index , 1);
    localStorage.setItem("products" , JSON.stringify(productlist));
    displayallproduct();
  }

  function searchproducts() {
    productcontainer.innerHTML = "";
    for( var i = 0 ; i < productlist.length ; i++) {
     if(
      productlist[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      displayproduct(i);
     } 
    }
  }

  
  function validate(regex , element) {
    if(regex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.nextElementSibling.classList.add("d-none")
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.nextElementSibling.classList.remove("d-none")
      return false;
    }
  }

  function getUpdateinfo(index) {
    updatedindex = index ;
    nameinput.value = productlist[index].name;
    categoryinput.value = productlist[index].category;
    priceinput.value = productlist[index].price;
    descriptioninput.value = productlist[index].description;
    / hide add button/ 
    addproduct.classList.add("d-none");
    / show update button /
    updateproduct.classList.remove("d-none")
  }

  function Updateproduct() {
    if(validate(nameRegex , nameinput) && validate(categpryRegex , categoryinput) && validate(priceRegex , priceinput) && validate(descriptionRegex , descriptioninput)) {
      productlist[updatedindex].name = nameinput.value;
      productlist[updatedindex].category = categoryinput.value;
      productlist[updatedindex].price = priceinput.value;
      productlist[updatedindex].description = descriptioninput.value;
      if(imageinput.files.length > 0) {
       productlist[updatedindex].Imagepath = "./assets/imgs/" + imageinput.files[0].name;
      }
      localStorage.setItem("products" , JSON.stringify(productlist));
      productcontainer.innerHTML= "";
      displayallproduct();
      clearInputs();
      updateproduct.classList.add("d-none");
      addproduct.classList.remove("d-none")
    }
          
     }
