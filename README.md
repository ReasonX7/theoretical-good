# theoretical-good

Problems of solution A (fixed by solution B):

- We have to do two requests to get all `goods` with discounts, since `goods` have to idea about `discount`;
- We can't apply one `discount` to several `goods`. For example, if we have a Black Friday and want to
  make discount 50% on all `goods`, we'll have to create a separate `discount` for each `good`;
- The way how discounts are stored is very non-obvious and every discount type requires a separate parser.
  But, we can come to a single formula for all discounts and in this case we can store discounts using a number
  of parameters: `value`, `everyItem`, `itemCountInRaw`, `valueType`.

## Solution A

### Goods

```
id | name   | price
1  | Milk   | 100
2  | Bread  | 200
3  | Meat   | 300
4  | Coffee | 50
```

### Discounts

```
id | goodId     | discountType  | value   | condition
1  | 1 (Milk)   | Fixed         | "70"    | Europe     - "Price"
2  | 2 (Bread)  | PricePerCount | "2:350" |            - "ItemCount:Price"
3  | 4 (Coffee) | FreeItem      | "4:3"   |            - "AllItemCount:PriceItemCount"
```

### API

```
GET /goods/{goodId}

{
  id: number,
  name: string,
  price: number,
}

GET /discounts/?goodId={goodId}

{
  id: number,
  goodId: number,
  discountType: "Fixed" | "PricePerCount" | "FreeItem"
  value: string
}
```

## Solution B

### Goods

```
id | name   | price | discountId
1  | Milk   | 100   | 1
2  | Bread  | 200   | 2
3  | Meat   | 300   | null
4  | Coffee | 50    | 3
```

### Discounts

```
id | value | everyItem | itemCountInRaw | valueType       
1  | 30    | 1         | 1              | number     Milk
2  | 50    | 2         | 1              | number     Bread
3  | 100   | 4         | 1              | percent    Coffee
```

### Formula

```
itemCountWithDiscount = floor(orderedItemCount / everyItem) * itemCountInRaw
itemCountWithoutDiscount = orderedItemCount - itemCountWithDiscount
finalPrice = itemCountWithDiscount * (type === "percent" ? price - price * (percent / 100) : price - value) + itemCountWithoutDiscount * price
```

### API

```
GET /goods/{goodId}

{
  id: number,
  name: string,
  price: number,
  discountId: number,
}

GET /goods/{goodId}?include=discount

{
  id: number,
  name: string,
  price: number,
  discountId: {
    id: number,
    goodId: number,
    discountType: "Fixed" | "PricePerCount" | "FreeItem"
    value: string
  },
}

GET /discounts/{discountId}

{
  id: number,
  goodId: number,
  discountType: "Fixed" | "PricePerCount" | "FreeItem"
  value: string
}
```

## Solution C (Graph Database)

### Goods

```
id | name   | price
1  | Milk   | 100
2  | Bread  | 200
3  | Meat   | 300
4  | Coffee | 50
```

### Discounts

```
id | discountType  | value
1  | Fixed         | "70"
2  | PricePerCount | "2:350"
3  | FreeItem      | "4:3"  
```

### GoodDiscountEdge

```
id | goodId  | discountId
1  | 1       | 1
2  | 2       | 2
3  | 4       | 3
```
