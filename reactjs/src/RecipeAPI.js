import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles"; 
const RecipeAPI = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  const fetchDefaultRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const API_URL =
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian";
      const response = await axios.get(API_URL);
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const fetchSearchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      const response = await axios.get(API_URL);
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]);
        setError("No matching recipes found.");
      }
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  return (
    <div
    >
      <h1
      >
        Vegetarian Recipes
      </h1>

      <div
      >
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
        >
          Search
        </button>
        <div>
        <Link to="/" style={styles.backButton}>
          Back to Home
        </Link>
        </div>
      </div>
      {query && (
        <button
          onClick={fetchDefaultRecipes}
          
        >
          Back to Main Menu
        </button>
      )}
      {loading ? (
        <p >Loading recipes..</p>
      ) : error ? (
        <p >{error}</p>
      ) : (
        <div
          
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              
            >
              <h2
               
              >
                {recipe.strMeal}
              </h2>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
               
              />
              <button
                
              >
                <a
                  href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  View Full Recipe
                </a>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeAPI;
