import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const ShoppingListPage = ({ setCart, setStep }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });
  const [isAdded, setIsAdded] = useState(false);

  const addItem = () => {
    if (newItem.name && newItem.quantity) {
      setItems([...items, newItem]);
      setNewItem({ name: "", quantity: "" });
    }
  };

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, ...items]);
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
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity}
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