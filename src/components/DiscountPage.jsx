import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const discountItems = [
  { name: "Smoked Ham D", brand: "GARANT", weight: "120g", oldPrice: 24.95, newPrice: 15.00, unitPrice: 125.00 },
  { name: "Chorizo", brand: "GARANT", weight: "300g", oldPrice: 30.95, newPrice: 20.00, unitPrice: 66.67 },
  { name: "Tortilla Original M", brand: "GARANT", weight: "320g", oldPrice: 16.95, newPrice: 10.00, unitPrice: 31.25 },
  { name: "Salmon Fillet C-trim", brand: "FALKENBERG", weight: "ca: 1.5kg", oldPrice: 279.00, newPrice: 159.00, unitPrice: 159.00, maxPurchase: 2 },
  { name: "Cheese Bread 4-pack", brand: "GARANT", weight: "200g", oldPrice: 15.00, newPrice: 12.00, unitPrice: 60.00 },
  { name: "Carrots Class 1", brand: "GARANT", weight: "1kg", oldPrice: 18.95, newPrice: 8.00, unitPrice: 8.00 },
];

const DiscountItem = ({ item, setCart, setShoppingList }) => {
  const handleAddToCart = () => {
    setCart(prevCart => [...prevCart, { ...item, quantity: 1, price: item.newPrice }]);
  };

  const handleAddToShoppingList = () => {
    setShoppingList(prevList => [...prevList, { ...item, quantity: 1, price: item.newPrice }]);
  };

  return (
    <Card className="p-4 space-y-2">
      <img src={`https://source.unsplash.com/100x100/?${item.name}`} alt={item.name} className="w-full h-32 object-cover" />
      <h3 className="font-bold">{item.name}</h3>
      <p>{item.brand}, {item.weight}</p>
      <p>Old price: ${item.oldPrice.toFixed(2)}</p>
      <p className="text-red-500 font-bold">${item.newPrice.toFixed(2)}</p>
      <p>Unit price: ${item.unitPrice.toFixed(2)}/kg</p>
      {item.maxPurchase && <p>Max {item.maxPurchase} purchases</p>}
      <div className="space-y-2">
        <Button onClick={handleAddToShoppingList} className="w-full">Add to List</Button>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </div>
    </Card>
  );
};

const DiscountPage = ({ setCart, setShoppingList }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Current Offers:</h2>
      <div className="grid grid-cols-2 gap-4">
        {discountItems.map((item, index) => (
          <DiscountItem key={index} item={item} setCart={setCart} setShoppingList={setShoppingList} />
        ))}
      </div>
    </div>
  );
};

export default DiscountPage;