import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const RecipeDetails = ({ recipe, setCart, setStep }) => {
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].quantity = newQuantity;
    setIngredients(updatedIngredients);
  };

  const totalCost = ingredients.reduce((sum, ing) => sum + ing.price * ing.quantity, 0);

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, { ...recipe, ingredients }]);
    setStep("cart");
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">{recipe.name}</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Ingredients:</h3>
        {ingredients.map((ing, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{ing.name}</span>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={ing.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-20"
              />
              <span>${(ing.price * ing.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl font-semibold">Total Cost: ${totalCost.toFixed(2)}</div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
      <div className="space-x-2">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button onClick={() => setStep("bubbles")} variant="outline">
          Back to Recipes
        </Button>
      </div>
    </Card>
  );
};

export default RecipeDetails;