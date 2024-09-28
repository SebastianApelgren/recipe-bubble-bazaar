import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const RecipeDetails = ({ recipe, setCart, setShoppingList, setStep }) => {
  const [ingredients, setIngredients] = useState(
    recipe.ingredients.map(ing => ({ ...ing, checked: true }))
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleCheckChange = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);
  };

  const totalCost = ingredients
    .filter(ing => ing.checked)
    .reduce((sum, ing) => sum + ing.price, 0);

  const handleAddToCart = () => {
    const selectedIngredients = ingredients.filter(ing => ing.checked);
    setCart((prevCart) => [...prevCart, ...selectedIngredients]);
    setIsAdded(true);
  };

  const handleAddToShoppingList = () => {
    const selectedIngredients = ingredients.filter(ing => ing.checked);
    setShoppingList((prevList) => [...prevList, ...selectedIngredients]);
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
        <ol className="list-decimal list-inside">
          {recipe.instructions.split('. ').map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div className="flex space-x-2">
        <motion.div
          animate={isAdded ? { backgroundColor: "#22c55e" } : {}}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Button
            onClick={isAdded ? () => setStep("cart") : handleAddToCart}
            className="w-full"
          >
            {isAdded ? "Go to Cart" : "Add to Cart"}
          </Button>
        </motion.div>
        <Button onClick={handleAddToShoppingList} className="flex-1">
          Add to Shopping List
        </Button>
      </div>
    </Card>
  );
};

export default RecipeDetails;