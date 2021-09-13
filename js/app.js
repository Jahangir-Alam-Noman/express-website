const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// show all products in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
        <div>
        <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p>Average Rating: ${product.rating.rate}</p>
        <p>Rating Count: ${product.rating.count}</p>
        <h3>Price: $ ${product.price}</h3>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>     
        <button onclick="cartDetails(${product.id})" type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//  get cart details 
const cartDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayCartDetails(data))
}

// show Single cart details in UI 
const displayCartDetails = (details) => {
  document.getElementById("cartDetails").textContent = '';
  const image = details.image;
  const div = document.createElement('div');
  div.classList.add("product");
  div.innerHTML = `
<div id="cartDetails" class="modal-body">
  <div class="single-product-details">
  <div>
  <img class="product-image" src=${image}></img>
  </div>
  <h3>${details.title}</h3>
  <p><strong>Category: ${details.category} </strong></p>
  <p><strong>Average Rating: ${details.rating.rate}</strong></p>
  <p><strong>Rating Count: ${details.rating.count}</strong></p>
  <h2>Price: $ ${details.price}</h2>
  <p>${details.description} </p>
</div>
    `;
  document.getElementById("cartDetails").appendChild(div);
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// set previous value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  const amount = document.getElementById(id);
  amount.innerText = parseFloat(value).toFixed(2);
  const totalAmount = parseFloat(amount.innerText);
  return totalAmount;
};


// update delivery charge , total Tax and total
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted <= 200) {
    const deliveryCharge = setInnerText("delivery-charge", 20);
    const tax = setInnerText("total-tax", priceConverted * 0);
    const grandTotal = priceConverted + deliveryCharge + tax;
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  }
  else if (priceConverted <= 400) {
    const deliveryCharge = setInnerText("delivery-charge", 30);
    const tax = setInnerText("total-tax", priceConverted * 0.2);
    const grandTotal = priceConverted + deliveryCharge + tax;
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  }
  else if (priceConverted <= 500) {
    const deliveryCharge = setInnerText("delivery-charge", 50);
    const tax = setInnerText("total-tax", priceConverted * 0.3);
    const grandTotal = priceConverted + deliveryCharge + tax;
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  }
  else {
    const deliveryCharge = setInnerText("delivery-charge", 60);
    const tax = setInnerText("total-tax", priceConverted * 0.4);
    const grandTotal = priceConverted + deliveryCharge + tax;
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  }
};


