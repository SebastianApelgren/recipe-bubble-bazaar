import ReactDOM from "react-dom/client";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipePrompt from "./components/RecipePrompt";
import RecipeBubbles from "./components/RecipeBubbles";
import RecipeDetails from "./components/RecipeDetails";
import Cart from "./components/Cart";
import ProfilePage from "./components/ProfilePage";
import ShoppingListPage from "./components/ShoppingListPage";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./components/HomePage";
import DiscountPage from "./components/DiscountPage";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [step, setStep] = useState("home");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cart, setCart] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);

  const addToRecentRecipes = (recipe) => {
    setRecentRecipes((prev) => {
      const updatedRecipes = [recipe, ...prev.filter((r) => r.name !== recipe.name)];
      return updatedRecipes.slice(0, 5); // Keep only the 5 most recent recipes
    });
  };

  const renderContent = () => {
    switch (step) {
      case "home":
        return <HomePage setStep={setStep} recentRecipes={recentRecipes} />;
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
            setShoppingList={setShoppingList}
            setStep={setStep}
            addToRecentRecipes={addToRecentRecipes}
          />
        );
      case "cart":
        return <Cart cart={cart} setCart={setCart} setStep={setStep} />;
      case "profile":
        return <ProfilePage setStep={setStep} />;
      case "shoppingList":
        return <ShoppingListPage setCart={setCart} setStep={setStep} shoppingList={shoppingList} setShoppingList={setShoppingList} />;
      case "discount":
        return <DiscountPage setCart={setCart} setShoppingList={setShoppingList} />;
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-red-100 p-4 pb-16 relative">
          <div className="flex justify-between items-center mb-6">
            {step === "prompt" && (
              <h1 className="text-3xl font-bold text-center text-red-500 font-serif">Recipe Generator</h1>
            )}
            <Button variant="outline" size="icon" onClick={() => setStep("profile")}>
              <User className="h-4 w-4" />
            </Button>
          </div>
          {renderContent()}
          <BottomNavigation setStep={setStep} cartItemCount={cart.length} shoppingListCount={shoppingList.length} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;