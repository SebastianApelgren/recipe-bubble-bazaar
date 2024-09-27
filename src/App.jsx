import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipePrompt from "./components/RecipePrompt";
import RecipeBubbles from "./components/RecipeBubbles";
import RecipeDetails from "./components/RecipeDetails";
import Cart from "./components/Cart";

const queryClient = new QueryClient();

const App = () => {
  const [step, setStep] = useState("prompt");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cart, setCart] = useState([]);

  console.log("Current step:", step); // Add this line for debugging

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Recipe Generator</h1>
          {step === "prompt" && (
            <RecipePrompt setRecipes={setRecipes} setStep={setStep} />
          )}
          {step === "bubbles" && (
            <RecipeBubbles
              recipes={recipes}
              setSelectedRecipe={setSelectedRecipe}
              setStep={setStep}
            />
          )}
          {step === "details" && (
            <RecipeDetails
              recipe={selectedRecipe}
              setCart={setCart}
              setStep={setStep}
            />
          )}
          {step === "cart" && (
            <Cart cart={cart} setCart={setCart} setStep={setStep} />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;