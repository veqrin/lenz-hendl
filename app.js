const decreaseAmountBtn = document.querySelector("button#decreaseAmountBtn");
const increaseAmountBtn = document.querySelector("button#increaseAmountBtn");
const amountInput = document.querySelector("input#amountInput");
const nameInput = document.querySelector("input#nameInput");
const emailInput = document.querySelector("input#emailInput");
const typeInput = document.querySelector("select#type");
const addOrderBtn = document.querySelector("button#addOrderBtn");
const tableBody = document.querySelector("#orderTableBody");

let amountValue = 10;

// Load saved orders
let orders = JSON.parse(localStorage.getItem("orders")) || [];

amountInput.value = amountValue;

// Save orders
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Render orders
function renderOrders() {
  tableBody.innerHTML = "";

  orders.forEach((order) => {
    const tr = document.createElement("tr");

    const pricePerEgg = order.type === "medium" ? 0.35 : 0.4;
    const price = order.amount * pricePerEgg;

    const values = [
      order.name,
      order.amount,
      order.type,
      order.email,
      price.toLocaleString("de-AT", {
        style: "currency",
        currency: "EUR",
      }),
    ];

    values.forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

// Amount Controls
function updateAmountButtons() {
  decreaseAmountBtn.style.opacity = amountValue <= 10 ? "0.5" : "1";
  increaseAmountBtn.style.opacity = amountValue >= 40 ? "0.5" : "1";
}

updateAmountButtons();

decreaseAmountBtn.addEventListener("click", () => {
  if (amountValue <= 10) return;

  amountValue -= 10;
  amountInput.value = amountValue;

  updateAmountButtons();
});

increaseAmountBtn.addEventListener("click", () => {
  if (amountValue >= 40) return;

  amountValue += 10;
  amountInput.value = amountValue;

  updateAmountButtons();
});

// Add Order
function addOrder(name, amount, type, email) {
  const order = {
    name,
    amount,
    type,
    email,
  };

  orders.push(order);

  saveOrders();
  renderOrders();
}

// Add Order Button
addOrderBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const amount = amountValue;
  const type = typeInput.value;

  if (!name) {
    alert("Bitte Name eingeben!");
    return;
  }

  addOrder(name, amount, type, email);

  nameInput.value = "";
  emailInput.value = "";

  amountValue = 10;
  amountInput.value = amountValue;

  typeInput.value = "medium";

  updateAmountButtons();
});

// Initial rendering
renderOrders();
