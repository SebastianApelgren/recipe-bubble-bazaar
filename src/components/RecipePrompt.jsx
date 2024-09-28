import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

const RecipePrompt = ({ setRecipes, setStep }) => {
  const [prompt, setPrompt] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (prompt) => {
      const response = await fetch("http://127.0.0.1:5000/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: prompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      setRecipes(data);
      setStep("bubbles");
    },
    onError: (error) => {
      console.error("Error fetching recipe:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your recipe prompt..."
        className="w-full"
      />
      <Button type="submit" disabled={isLoading} className="w-full bg-red-500 hover:bg-red-800 text-white">
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Recipes"
        )}
      </Button>
    </form>
  );
};

export default RecipePrompt;