import React from 'react';
import { Button } from "@/components/ui/button";

const HomePage = ({ setStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-red-500 font-serif">Welcome!</h2>
      <div className="space-y-4">
        <Button onClick={() => setStep("recentRecipes")} className="w-full bg-red-500 text-white hover:bg-red-700">
          Recent Recipes
        </Button>
        <Button onClick={() => setStep("favoriteRecipes")} className="w-full bg-red-500 text-white hover:bg-red-700">
          Favorite Recipes
        </Button>
      </div>
    </div>
  );
};

export default HomePage;