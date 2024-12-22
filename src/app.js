let cart = [];

// Función para cargar productos desde el archivo JSON
async function loadProducts() {
  try {
    const response = await fetch('./images/products.json'); // Ruta del archivo JSON
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Renderizar productos
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4");

    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="fw-bold">€${product.price}</p>
          <button class="btn add-to-cart" data-id="${product.id}">Agregar al carrito</button>
        </div>
      </div>
    `;

    productList.appendChild(productCard);
  });

  // Event listeners para agregar al carrito
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const product = products.find((item) => item.id === productId);
      addToCart(product);
    });
  });
}

// Agregar producto al carrito
function addToCart(product) {
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartDisplay();
}

// Renderizar carrito
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    cartItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span class="badge bg-primary">€${item.price * item.quantity}</span>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById("cart-count").textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Comprar productos
function checkout() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Gracias por tu compra. Total pagado: €${total}.`);
  cart = [];
  updateCartDisplay();
}

// Botón de compra
const checkoutButton = document.createElement("button");
checkoutButton.textContent = "Comprar";
checkoutButton.classList.add("btn", "btn-success", "mt-3");
checkoutButton.addEventListener("click", checkout);
document.getElementById("cart").appendChild(checkoutButton);

// Inicializar la tienda cargando productos desde el JSON
loadProducts();

  
  