import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const ShoppingListPage = ({ setCart, setStep, shoppingList, setShoppingList }) => {
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });
  const [isAdded, setIsAdded] = useState(false);

  const addItem = () => {
    if (newItem.name && newItem.quantity) {
      setShoppingList([...shoppingList, { ...newItem, price: 0 }]);
      setNewItem({ name: "", quantity: "" });
    }
  };

  const removeItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, ...shoppingList]);
    setIsAdded(true);
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
        <Button onClick={addItem}>Add</Button>
      </div>
      <ul className="space-y-2">
        {shoppingList.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item.name} - {item.quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <motion.div
        animate={isAdded ? { backgroundColor: "#22c55e" } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="w-full"
          onClick={isAdded ? () => setStep("cart") : addToCart}
        >
          {isAdded ? "Go to Cart" : "Add to Cart"}
        </Button>
      </motion.div>
    </div>
  );
};

export default ShoppingListPage;