import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RecipePrompt = ({ setRecipes, setStep }) => {
  const [prompt, setPrompt] = useState("");

  const { refetch, isLoading } = useQuery({
    queryKey: ["generateRecipe"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:5000/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: false,
    onSuccess: (data) => {
      console.log("Received data:", data); // Debug log
      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
        setStep("bubbles");
      } else {
        console.error("Unexpected data format:", data);
      }
    },
    onError: (error) => {
      console.error("Error fetching recipes:", error);
      // Optionally, you can add error handling UI here
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting prompt:", prompt); // Debug log
    refetch();
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
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Generating..." : "Generate Recipes"}
      </Button>
    </form>
  );
};

export default RecipePrompt;