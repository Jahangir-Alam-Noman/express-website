const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// show all product in UI 
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
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

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


