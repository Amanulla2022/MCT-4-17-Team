let nameTO = document.getElementById("custmer_name");
let emailTO = document.getElementById("custmer_email");
let addressTO = document.getElementById("custmer_address");

let nameFrom = document.getElementById("seller_name");
let emailFrom = document.getElementById("seller_email");
let addressFrom = document.getElementById("seller_address");

// ------------------Auto date save ----------------------

const dateObj = new Date();
const day = dateObj.getDate();
const month = dateObj.getMonth() + 1;
const year = dateObj.getFullYear();

const newDate = `${day}/${month}/${year}`;
document.getElementById("curr_date").innerHTML = newDate;
// console.log(newDate);

// ---------------- To auto generate invoice-no ----------------

const getRandomId = (min = 0, max = 500000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().padStart(6, "0");
};
const invoiceNo = getRandomId();
document.getElementById("invoice_no").value = invoiceNo;
//   console.log(invoiceNo);

//---------- ------ ADD INVOICE ITEM (New Row) ---------------

const tBody = document.getElementById("table-body");

// Function to add a new row
function addNewRow() {
  var tableBody = document.getElementById("table-body");

  var newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td class="item-data">
            <div class="item-name">
              <input type="text" placeholder="item name" class="input-name-discription" required />
              <input type="text" placeholder="item description" class="input-name-discription" />
            </div>
          </td>
          <td>
            <input type="number" placeholder="01" class="qty-data" onkeyup="getSubTotal()" required />
          </td>
          <td>
            <div class="rupee">
              <span class="rupee-icon">₹</span>
              <input type="text" placeholder="01:00" class="rupe-text" onkeyup="getSubTotal()" required />
            </div>
          </td>
          <td>
            <div class="dlt" id="dlt_row">
              <img src="./img/delete.png" alt="" class="delete-btn" onclick="removeInvoiceItem(this)" />
            </div>
          </td>
        `;

  tableBody.appendChild(newRow);

  // Recalculate subtotal and total after adding a new row
  getSubTotal();
  calculateTotal();
}

// Function to remove a row
function removeInvoiceItem(element) {
  var rowToRemove = element.closest("tr");
  rowToRemove.remove();

  // Recalculate subtotal and total after removing a row
  getSubTotal();
  calculateTotal();
}

// Function to calculate subtotal and update the display
function getSubTotal() {
  var rows = document.querySelectorAll("#table-body tr");
  var subTotal = 0;

  rows.forEach(function (row) {
    var quantity = parseInt(row.querySelector(".qty-data").value) || 0;
    var price =
      parseFloat(row.querySelector(".rupe-text").value.replace("₹", "")) || 0;
    var rowTotal = quantity * price;
    subTotal += rowTotal;
  });

  document.getElementById("sub_total").innerText = "₹ " + subTotal.toFixed(2);

  // Recalculate total after updating subtotal
  calculateTotal();
}

// Function to calculate total, taking into account taxes and discounts
function calculateTotal() {
  var subTotal =
    parseFloat(
      document.getElementById("sub_total").innerText.replace("₹", "")
    ) || 0;
  var taxRate = parseFloat(document.querySelector(".tax-text").value) || 0;
  var discountRate =
    parseFloat(document.querySelector(".discount-text").value) || 0;

  var taxAmount = (taxRate / 100) * subTotal;
  var discountAmount = (discountRate / 100) * subTotal;

  var totalAmount = subTotal + taxAmount - discountAmount;

  document.querySelector(".tax span:last-child").innerText = "₹ " + taxAmount;
  document.querySelector(".discount span:last-child").innerText =
    "₹ " + discountAmount;
  document.querySelector(".total span:last-child").innerText =
    "₹ " + totalAmount;
}

//--------------------- Right part-------------------

// Right part
let netAmount = 0,
  subTotal = 0,
  discount = 0,
  tax = 0;

// calculate totals
function calculateTotal() {
  var subTotal =
    parseFloat(
      document.getElementById("sub_total").innerText.replace("₹", "")
    ) || 0;
  var taxRate = parseFloat(document.getElementById("input-tax").value) || 0;
  var discountRate =
    parseFloat(document.getElementById("input-discount").value) || 0;

  var taxAmount = (taxRate / 100) * subTotal;
  var discountAmount = (discountRate / 100) * subTotal;

  var totalAmount = subTotal + taxAmount - discountAmount;

  document.getElementById("total-tax").innerText = "₹ " + taxAmount.toFixed(2);
  document.getElementById("total-discount").innerText =
    "₹ " + discountAmount.toFixed(2);
  document.getElementById("net-amount").innerText =
    "₹ " + totalAmount.toFixed(2);
}

// Right section
// tax
let taxInput = document.getElementById("input-tax");
taxInput.addEventListener("input", () => {
  tax = taxInput.value;
  document.getElementById("tax-per").innerText = `(${tax}%)`;
  //   calculateTotalSub();
});

// discount
let discountInput = document.getElementById("input-discount");
discountInput.addEventListener("input", () => {
  discount = discountInput.value;
  document.getElementById("discount-per").innerText = `(${discount}%)`;
  //   calculateTotalSub();
});

//currency

// ---review invoice button function -------

// Function to open the review modal
function openReviewModal() {
  // Get current date
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString();

  // Get due date
  const dueDateInput = document.querySelector(".due-date");
  const dueDate = dueDateInput.value;

  // Get invoice from details
  const invoiceFrom = {
    name: nameFrom.value,
    email: emailFrom.value,
    address: addressFrom.value,
  };
  // Get invoice to details
  const invoiceTo = {
    name: nameTO.value,
    email: emailTO.value,
    address: addressTO.value,
  };

  //item name and price
  const itemDetails = [];
  const rows = document.querySelectorAll("#table-body tr");
  rows.forEach(function (row, index) {
    const itemName = row.querySelector(".input-name-discription").value;
    const itemDescription = row.querySelector(".input-name-discription").value;
    const quantity = parseInt(row.querySelector(".qty-data").value) || 0;
    const price =
      parseFloat(row.querySelector(".rupe-text").value.replace("₹", "")) || 0;
    const total = quantity * price;

    itemDetails.push({
      index: index + 1,
      itemName: itemName,
      itemDescription: itemDescription,
      quantity: quantity,
      price: price,
      total: total.toFixed(2),
    });
  });

  console.log("Item Details:", itemDetails);

  // console.log(invoiceFrom.name);
  // Populate modal content
  document.getElementById("modalCurrentDate").innerText = formattedCurrentDate;
  document.getElementById("modalDueDate").innerText = dueDate;
  document.getElementById("modalInvoiceFromName").innerText = invoiceFrom.name;
  document.getElementById("modalInvoiceFromEmail").innerText =
    invoiceFrom.email;
  document.getElementById("modalInvoiceFromAddress").innerText =
    invoiceFrom.address;

  document.getElementById("modalInvoiceToName").innerText = invoiceTo.name;
  document.getElementById("modalInvoiceToEmail").innerText = invoiceTo.email;
  document.getElementById("modalInvoiceToAddress").innerText =
    invoiceTo.address;

  // items name and bill fetch

  const itemDetailsContainer = document.getElementById("modalItemDetails");
  itemDetailsContainer.innerHTML = ""; // Clear previous content

  itemDetails.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
            <p><b>Item ${item.index}:</b></p>
            <ul>
                <li><b>Name:</b> ${item.itemName}</li>
                <li><b>Description:</b> ${item.itemDescription}</li>
                <li><b>Quantity:</b> ${item.quantity}</li>
                <li><b>Price:</b> ₹ ${item.price}</li>
                <li><b>Total:</b> ₹ ${item.total}</li>
            </ul>
        `;
    itemDetailsContainer.appendChild(itemElement);
  });

  // Display the modal
  document.getElementById("invoiceReviewModal").style.display = "block";
}

// Function to close the review modal
function closeReviewModal() {
  document.getElementById("invoiceReviewModal").style.display = "none";
}

// Add event listener to the "Review Invoice" button
const reviewButton = document.querySelector(".review");
reviewButton.addEventListener("click", openReviewModal);

/// fetching items name and price

//----- download data--------
document.querySelector("#download-btn").addEventListener("click", () => {
  console.log("hmm");
  const content = document.querySelector(".modal");
  html2pdf().from(content).save();
});
