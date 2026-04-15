let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

// Column widths (matching the expected output)
const QTY_WIDTH = 8;
const ITEM_WIDTH = 20;

// Print header
console.log(`${"QTY".padEnd(QTY_WIDTH)}${"ITEM".padEnd(ITEM_WIDTH)}TOTAL`);

let totalOrder = 0;

// Process each item using object destructuring
for (const { itemName, quantity, unitPricePence } of order) {
  const itemTotalPence = quantity * unitPricePence;
  const itemTotalPounds = (itemTotalPence / 100).toFixed(2);
  
  // Print the line item
  console.log(
    `${quantity.toString().padEnd(QTY_WIDTH)}${itemName.padEnd(ITEM_WIDTH)}${itemTotalPounds}`
  );
  
  // Accumulate total (parseFloat to convert string back to number)
  totalOrder += parseFloat(itemTotalPounds);
}

// Print final total (fixed to 2 decimal places)
console.log(`\nTotal: ${totalOrder.toFixed(2)}`);

