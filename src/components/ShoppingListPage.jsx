import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const ShoppingListPage = ({ setCart, setStep, shoppingList, setShoppingList }) => {
  const [newItem, setNewItem] = useState({ name: "", quantity: "", price: "" });

  const addItem = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      setShoppingList([...shoppingList, { ...newItem, price: parseFloat(newItem.price) }]);
      setNewItem({ name: "", quantity: "", price: "" });
    }
  };

  const removeItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, ...shoppingList]);
    setStep("cart");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Shopping List</h2>
      <div className="flex space-x-2">
        <Input
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <Input
          placeholder="Price"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      <ul className="space-y-2">
        {shoppingList.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item.name} - {item.quantity} - ${item.price.toFixed(2)}</span>
            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full" onClick={addToCart}>
        Add All to Cart
      </Button>
    </div>
  );
};

export default ShoppingListPage;