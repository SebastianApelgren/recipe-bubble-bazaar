import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RecipePrompt = ({ setRecipes, setStep }) => {
  const [prompt, setPrompt] = useState("");

  // Define the mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: async (prompt) => {
      // Move the fetch request here
      const response = await fetch("http://127.0.0.1:5000/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: prompt }), // Send the prompt to the server
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json(); // Return the JSON response
    },
    onSuccess: (data) => {
      // This callback will run when the mutation is successful
      setRecipes(data); // Update the recipes state with the fetched data
      setStep("bubbles"); // Move to the next step in the app
    },
    onError: (error) => {
      console.error("Error fetching recipe:", error); // Handle any errors
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(prompt); // Trigger the mutation and pass the prompt
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
        {isLoading ? "Generating..." : "Generate Recipes"}
      </Button>
    </form>
  );
};

export default RecipePrompt;