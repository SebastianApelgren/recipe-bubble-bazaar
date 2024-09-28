import React from 'react';
import { Button } from "@/components/ui/button";

const HomePage = ({ setStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome!</h2>
      <div className="space-y-4">
        <Button onClick={() => setStep("recentRecipes")} className="w-full">
          Recent Recipes
        </Button>
        <Button onClick={() => setStep("favoriteRecipes")} className="w-full">
          Favorite Recipes
        </Button>
      </div>
    </div>
  );
};

export default HomePage;