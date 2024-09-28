import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const RecipeDetails = ({ recipe, setShoppingList, setStep }) => {
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
    .reduce((sum, ing) => sum + ing.price, 0);

  const handleAddToShoppingList = () => {
    const selectedIngredients = ingredients.filter(ing => ing.checked);
    setShoppingList((prevList) => [...prevList, ...selectedIngredients]);
    toast.success(`Added ${selectedIngredients.length} item(s) to the shopping list`);
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
          {recipe.instructions.split(/\d+\./).filter(Boolean).map((instruction, index) => (
            <li key={index}>{instruction.trim()}</li>
          ))}
        </ol>
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleAddToShoppingList} className="flex-1">
          Add to Shopping List
        </Button>
      </div>
    </Card>
  );
};

export default RecipeDetails;