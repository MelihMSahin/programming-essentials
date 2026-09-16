"use strict";
/**
 * MINI-PROJECT: SMART RECEIPT & DISCOUNT GENERATOR
 *
 * YOUR CHALLENGE:
 * Use your JavaScript and TypeScript skills to complete the 4 steps below.
 * Write clean code, and use the VS Code debugger to watch your logic execute!
 *
 * --------------------------------------------------------------------------
 * STEP 1: DEFINE THE INTERFACE
 * Create an interface named 'Product' that sets the structural shape for an
 * object. It must require the exact properties and types seen in the array below:
 *  - id (number)
 *  - name (string)
 *  - price (number)
 *  - inStock (boolean)
 *  - category (string)
 * --------------------------------------------------------------------------
 * STEP 2: ANNOTATE YOUR DATA
 * Add a TypeScript type annotation to the 'inventory' array below to guarantee
 * it strictly contains an array of 'Product' objects.
 * --------------------------------------------------------------------------
 * STEP 3: CREATE THE DISCOUNT ENGINE (ARRAY METHODS & ARROW FUNCTIONS)
 * Create an arrow function named 'processPromoItems'.
 * Inside this function:
 *  - Use '.filter()' to keep only products where 'inStock' is true.
 *  - Use '.map()' to take those available items and reduce their 'price' by 10%.
 *  - Return the final processed array.
 * --------------------------------------------------------------------------
 * STEP 4: PRINT THE SUMMARY (LOOPS & LOGGING)
 * Call your function and store the result. Create a running total variable.
 * Use a 'for...of' loop to loop through your discounted products:
 *  - Use 'console.log()' to print out each item's name and new discounted price.
 *  - Add the item's price to your running total variable.
 *  - Print out the final total due at the very end of the script.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// STARTING DATA (Add your Interface above this, and your Type Annotation here)
const inventory = [
    { id: 1, name: "Mechanical Keyboard", price: 100, inStock: true, category: "Electronics" },
    { id: 2, name: "Wireless Mouse", price: 50, inStock: false, category: "Electronics" },
    { id: 3, name: "Coffee Mug", price: 15, inStock: true, category: "Kitchen" },
    { id: 4, name: "Desk Mat", price: 25, inStock: true, category: "Office" }
];
function processPromoItems(items) {
    items.filter((item) => item.inStock);
    items.map((item) => { item.price *= 0.9; return item; });
    return items;
}
let total = 0;
for (const element of processPromoItems(inventory)) {
    console.log(`${element.name} costs ${element.price}`);
    total += element.price;
}
console.log(`Total price is ${total}`);
//# sourceMappingURL=mock-up.js.map