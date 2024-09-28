import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const RecipeBubbles = ({ recipes, setSelectedRecipe, setStep }) => {
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setStep("details");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe, index) => (
          <Card key={index} className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
            <img
              src={`${recipe.image_url}`}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-2">
              Cost: ${recipe.ingredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}
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