import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// DiscountItem Component
const DiscountItem = ({ item, setShoppingList }) => {
  const handleAddToShoppingList = () => {
    setShoppingList(prevList => [...prevList, { ...item, quantity: 1, price: item.price }]);
  };

  return (
    <Card className="p-4 space-y-2">
      <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover" />
      <h3 className="font-bold">{item.name}</h3>
      <p>{item.quantity}</p>
      <p className="text-red-500 font-bold">${item.price.toFixed(2)} /{item.price_unit}</p>
      <div className="space-y-2">
        <Button onClick={handleAddToShoppingList} className="w-full">Add to List</Button>
      </div>
    </Card>
  );
};

// DiscountPage Component
const DiscountPage = ({ setShoppingList }) => {
  const [discountItems, setDiscountItems] = useState([]);  // State to store discount items
  const [loading, setLoading] = useState(true);            // State to track loading status
  const [error, setError] = useState(null);                // State to track errors

  // useEffect to fetch discount items from backend
  useEffect(() => {
    const fetchDiscountItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_sale_items');
        if (!response.ok) {
          throw new Error('Failed to fetch discount items');
        }
        const data = await response.json();
        setDiscountItems(data);  // Set the discount items from the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Stop loading after data fetch
      }
    };

    fetchDiscountItems();
  }, []);  // Empty dependency array means this runs once on mount

  // Display loading, error, or the discount items
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Current Offers:</h2>
      <div className="grid grid-cols-2 gap-4">
        {discountItems.length > 0 ? (
          discountItems.map((item, index) => (
            <DiscountItem key={index} item={item} setShoppingList={setShoppingList} />
          ))
        ) : (
          <p>No discount items available.</p>
        )}
      </div>
    </div>
  );
};

export default DiscountPage;