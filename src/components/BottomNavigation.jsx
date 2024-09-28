import { List, ShoppingCart, ChefHat, User, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BottomNavigation = ({ setStep, cartItemCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-around items-center">
      <Button variant="ghost" onClick={() => setStep("shoppingList")}>
        <List className="h-6 w-6" />
      </Button>
      <Button variant="ghost" disabled>
        <Percent className="h-6 w-6" />
      </Button>
      <Button variant="ghost" onClick={() => setStep("prompt")}>
        <ChefHat className="h-6 w-6" />
      </Button>
      <Button variant="ghost" onClick={() => setStep("profile")}>
        <User className="h-6 w-6" />
      </Button>
      <Button variant="ghost" onClick={() => setStep("cart")} className="relative">
        <ShoppingCart className="h-6 w-6" />
        {cartItemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            {cartItemCount}
          </motion.span>
        )}
      </Button>
    </div>
  );
};

export default BottomNavigation;