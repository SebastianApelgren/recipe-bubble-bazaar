import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

const Cart = ({ cart, setCart, setStep }) => {
  const [address, setAddress] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const { refetch, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["checkout"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: cart.flatMap((recipe) => recipe.ingredients),
          address,
          card: { cardHolder, cardNumber, cvv },
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: false,
  });

  const handleCheckout = () => {
    refetch();
  };

  const totalCost = cart.reduce(
    (sum, recipe) =>
      sum + recipe.ingredients.reduce((recipeSum, ing) => recipeSum + ing.price * ing.quantity, 0),
    0
  );

  const totalItems = cart.reduce(
    (sum, recipe) => sum + recipe.ingredients.length,
    0
  );

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Your Cart ({totalItems} items)</h2>
      {cart.map((recipe, index) => (
        <div key={index} className="border-b pb-2">
          <h3 className="text-xl font-semibold">{recipe.name}</h3>
          <ul>
            {recipe.ingredients.map((ing, ingIndex) => (
              <li key={ingIndex} className="flex justify-between">
                <span>{ing.name} - Quantity: {ing.quantity}</span>
                <span>${(ing.price * ing.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-xl font-semibold">Total Cost: ${totalCost.toFixed(2)}</div>
      <div className="space-y-2">
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Delivery Address"
        />
        <Input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Card Holder Name"
        />
        <Input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
        />
        <Input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="CVV"
        />
      </div>
      <div className="space-x-2">
        <Button onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? "Processing..." : "Checkout"}
        </Button>
        <Button onClick={() => setStep("prompt")} variant="outline">
          Back to Prompt
        </Button>
      </div>
      {isSuccess && (
        <div className="flex items-center text-green-500">
          <CheckCircle className="mr-2" /> Order placed successfully!
        </div>
      )}
      {isError && (
        <div className="flex items-center text-red-500">
          <XCircle className="mr-2" /> Error: {error.message}
        </div>
      )}
    </Card>
  );
};

export default Cart;