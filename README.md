# theoretical-good

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
id | goodId     | discountType  | value
1  | 1 (Milk)   | Fixed         | "70"    - "Price"
2  | 2 (Bread)  | PricePerCount | "2:350" - "ItemCount:Price"
3  | 4 (Coffee) | FreeItem      | "4:3"   - "AllItemCount:PriceItemCount"
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
id | goodId     | discountType  | value
1  | 1 (Milk)   | Fixed         | "70"    - "Price"
2  | 2 (Bread)  | PricePerCount | "2:350" - "ItemCount:Price"
3  | 4 (Coffee) | FreeItem      | "4:3"   - "AllItemCount:PriceItemCount"

id | value | everyItem | itemCountInRaw | type       
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
