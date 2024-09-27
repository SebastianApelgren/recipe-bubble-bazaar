import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const RecipeBubbles = ({ recipes, setSelectedRecipe, setStep }) => {
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setStep("details");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Recipe Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe, index) => (
          <Card key={index} className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="w-32 h-32 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-semibold text-blue-800">{recipe.name.slice(0, 2)}</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-center">{recipe.name}</h3>
            <p className="text-gray-600 mb-2 text-center">
              Ingredients: {recipe.ingredients.length}
            </p>
            <Button onClick={() => handleSelectRecipe(recipe)} className="w-full">
              View Recipe
            </Button>
          </Card>
        ))}
      </div>
      <Button onClick={() => setStep("prompt")} variant="outline" className="w-full">
        Back to Prompt
      </Button>
    </div>
  );
};

export default RecipeBubbles;