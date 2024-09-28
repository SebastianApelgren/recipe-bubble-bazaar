import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomePage = ({ setStep, recentRecipes }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-red-500 font-serif">Welcome!</h2>
      <div className="space-y-4">
        <Button onClick={() => setStep("prompt")} className="w-full bg-red-500 text-white hover:bg-red-700">
          Generate New Recipes
        </Button>
        <h3 className="text-xl font-semibold text-red-500 ">Recent Recipes</h3>
        <div className="grid grid-cols-2 gap-4">
          {recentRecipes.map((recipe, index) => (
            <Card key={index} className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setStep("details")}>
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="font-bold text-sm">{recipe.name}</h4>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;