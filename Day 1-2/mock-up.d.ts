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
export {};
//# sourceMappingURL=mock-up.d.ts.map