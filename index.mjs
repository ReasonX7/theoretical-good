const calculateFinalPrice = (price, orderedItemCount, discount) => {
  if (!discount) {
    return price * orderedItemCount;
  }

  const {
    value, everyItem, itemCountInRaw, type,
  } = discount;

  const itemCountWithDiscount = orderedItemCount >= everyItem ? Math.floor(orderedItemCount / everyItem) * itemCountInRaw : 0;
  const itemCountWithoutDiscount = orderedItemCount - itemCountWithDiscount;
  const itemWithDiscountPrice = itemCountWithDiscount * (type === "percent" ? price - price * (value / 100) : price - value);

  return itemWithDiscountPrice + itemCountWithoutDiscount * price;
}

// ===================================
// MILK
// ===================================

const milkPrice = 100;
const milkCount = 1;
const milkDiscount = {
  value: 30,
  everyItem: 1,
  itemCountInRaw: 1,
  type: "number",
};

console.log("Good:", "Milk");
console.log("Price:", milkPrice);
console.log("Count:", milkCount);
console.table(milkDiscount);
console.log("FinalPrice:", calculateFinalPrice(milkPrice, milkCount, milkDiscount));

console.log();
console.log("===================================");
console.log();

// ===================================
// MILK
// ===================================

const breadPrice = 200;
const breadCount = 2;
const breadDiscount = {
  value: 50,
  everyItem: 2,
  itemCountInRaw: 1,
  type: "number",
};

console.log("Good:", "Bread");
console.log("Price:", breadPrice);
console.log("Count:", breadCount);
console.table(breadDiscount);
console.log("FinalPrice:", calculateFinalPrice(breadPrice, breadCount, breadDiscount));
console.log();

// ===================================
// COFFEE
// ===================================

const coffeePrice = 50;
const coffeeCount = 4;
const coffeeDiscount = {
  value: 100,
  everyItem: 4,
  itemCountInRaw: 1,
  type: "percent",
};

console.log("Good:", "Coffee");
console.log("Price:", coffeePrice);
console.log("Count:", coffeeCount);
console.table(coffeeDiscount);
console.log("FinalPrice:", calculateFinalPrice(coffeePrice, coffeeCount, coffeeDiscount));
console.log();
