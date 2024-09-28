import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import RecipePrompt from "./components/RecipePrompt";
import RecipeBubbles from "./components/RecipeBubbles";
import RecipeDetails from "./components/RecipeDetails";
import Cart from "./components/Cart";
import ProfilePage from "./components/ProfilePage";

const queryClient = new QueryClient();

const App = () => {
  const [step, setStep] = useState("prompt");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cart, setCart] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const renderContent = () => {
    if (showProfile) {
      return <ProfilePage setShowProfile={setShowProfile} />;
    }

    switch (step) {
      case "prompt":
        return <RecipePrompt setRecipes={setRecipes} setStep={setStep} />;
      case "bubbles":
        return (
          <RecipeBubbles
            recipes={recipes}
            setSelectedRecipe={setSelectedRecipe}
            setStep={setStep}
          />
        );
      case "details":
        return (
          <RecipeDetails
            recipe={selectedRecipe}
            setCart={setCart}
            setStep={setStep}
          />
        );
      case "cart":
        return <Cart cart={cart} setCart={setCart} setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-100 p-4 relative">
          <Button
            className="absolute top-4 left-4"
            onClick={() => setShowProfile(true)}
          >
            Profile
          </Button>
          <Button
            className="absolute top-4 right-4"
            onClick={() => setStep("cart")}
          >
            Cart
          </Button>
          <h1 className="text-3xl font-bold text-center mb-6 pt-12">Recipe Generator</h1>
          {renderContent()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;