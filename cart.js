const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (discountRate < 0 || discountRate > 1) {
    console.warn("Invalid discount rate. Must be between 0 and 1.");
    return total;
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
//Added extra check for total not number or -
  if (typeof total !== "number" || isNaN(total)) {
    total = 0;
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total,0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

/*Summary 
error 1 
Uncaught TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (cart.js:10:29)
    at cart.js:30:15Understand this error
Fix : code changes from for (let i = 0; i <= cartItems.length; i++) to 
for (let i = 0; i < cartItems.length; i++)

Error 2 Edge case for Discount rate was not validate 0 & 1 
added code in function to warn and keep the total displayed as 0 % discount.
Bug  3- // Bug: total may not be a number
added code in function to make total 0 in case above errrr

Summary Comments:
// Fixed off-by-one error in for-loop in calculateTotal (changed <= to <)
// Added validation for discountRate in applyDiscount (range 0–1)
// Handled possible NaN in generateReceipt if total isn't a valid number
// Used console warnings to inform of invalid discount values
// Used Chrome Developer Tools to inspect call stack and track where the error occurred
// Set breakpoints and used debugger to inspect loop values and variable states
*/
