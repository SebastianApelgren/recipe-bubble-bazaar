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

  const renderContent = () => {
    switch (step) {
      case "home":
        return <HomePage setStep={setStep} />;
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
        <div className="min-h-screen bg-red-200 p-4 pb-16 relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-center text-red-500 font-Times New Roman">Recipe Generator</h1>
            <Button variant="outline" size="icon" onClick={() => setStep("profile")}>
              <User className="h-4 w-4" />
            </Button>
          </div>
          {renderContent()}
          <BottomNavigation setStep={setStep} cartItemCount={cart.length} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;