let cart = [];


document.querySelectorAll(".card").forEach(card => {
  const minus = card.querySelector(".minus");
  const plus = card.querySelector(".plus");
  const count = card.querySelector(".count");
  const addBtn = card.querySelector(".add");

  let quantity = 1;

  plus.addEventListener("click", () => {
    quantity++;
    count.textContent = quantity;
  });

  minus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      count.textContent = quantity;
    }
  });

  // AGREGAR AL CARRITO CON CANTIDAD
  addBtn.addEventListener("click", () => {
    const name = card.querySelector(".title").textContent;
    const price = card.querySelector(".price").textContent;

    cart.push({ name, price, quantity });

    alert(`Agregaste ${quantity} producto(s) 🛒`);
    renderCart();
  });
});

// MOSTRAR / OCULTAR CARRITO
const cartIcon = document.querySelector(".cart");
const cartPanel = document.getElementById("cartPanel");

cartIcon.addEventListener("click", () => {
  cartPanel.style.display =
    cartPanel.style.display === "block" ? "none" : "block";
});

// RENDERIZAR
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} x${product.quantity} - ${product.price}`;
    cartItems.appendChild(li);
  });
 



}
