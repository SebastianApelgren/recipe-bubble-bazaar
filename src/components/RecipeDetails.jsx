import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const RecipeDetails = ({ recipe, setCart, setStep }) => {
  const [ingredients, setIngredients] = useState(
    recipe.ingredients.map(ing => ({ ...ing, checked: true }))
  );

  const handleCheckChange = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
  };

  const totalCost = ingredients
    .filter(ing => ing.checked)
    .reduce((sum, ing) => sum + ing.price * ing.quantity, 0);

  const handleAddToCart = () => {
    const selectedIngredients = ingredients.filter(ing => ing.checked);
    setCart((prevCart) => [...prevCart, { ...recipe, ingredients: selectedIngredients }]);
    setStep("cart");
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">{recipe.name}</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Ingredients:</h3>
        {ingredients.map((ing, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              checked={ing.checked}
              onCheckedChange={() => handleCheckChange(index)}
              id={`ingredient-${index}`}
            />
            <label htmlFor={`ingredient-${index}`} className="flex-grow">
              {ing.name} - Quantity: {ing.quantity}
            </label>
            <span>${ing.price.toFixed(2)}</span>
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