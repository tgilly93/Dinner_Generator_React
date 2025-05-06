import apiClient from "../../utils/apiClient";

const mealService = {
  async getRandomMeal() {
    try {
      const response = await apiClient.get("random.php");
      return response.data.meals[0];
    } catch (error) {
      console.error("Error fetching random meal:", error);
      throw error;
    }
  },

  async getAllMealCategories() {
    try {
      const response = await apiClient.get("categories.php");
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching meal categories:", error);
      throw error;
    }
  },

  async getMealsByCategory(categoryName) {
    try {
      const response = await apiClient.get(`filter.php?c=${categoryName}`);
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching meals of this category:", error);
      throw error;
    }
  },

  async searchMealByName(query) {
    try {
      const response = await apiClient.get(`search.php?s=${query}`);
      return response.data.meals;
    } catch (error) {
      console.error("Error searching meal by name:", error);
      throw error;
    }
  },

  async getMealById(id) {
    try {
      const response = await apiClient.get(`lookup.php?i=${id}`);
      return response.data.meals[0];
    } catch (error) {
      console.error("Error fetching meal by ID:", error);
      throw error;
    }
  },

  async getMealsByFirstLetter(letter) {
    try {
      const response = await apiClient.get(`search.php?f=${letter}`);
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching meals by first letter:", error);
      throw error;
    }
  },

  async getAllMealAreas() {
    try {
      const response = await apiClient.get("list.php?a=list");
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching meal areas:", error);
      throw error;
    }
  },

  async getMealsByArea(areaName) {
    try {
      const response = await apiClient.get(`filter.php?a=${areaName}`);
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching meals by area:", error);
      throw error;
    }
  },

  async getAllIngredients() {
    try {
      const response = await apiClient.get("list.php?i=list");
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      throw error;
    }
  },

  async getMealsByIngredient(ingredientName) {
    try {
      const response = await apiClient.get(`filter.php?i=${ingredientName}`);
      return response.data.meals;
    } catch (error) {
      console.error("Error fetching meals by ingredient:", error);
      throw error;
    }
  },

  async getRandomMealPlan() {
    try {
      const selectedMeals = new Map();

      const [breakfastMeals, dessertMeals] = await Promise.all([
        this.getMealsByCategory("Breakfast"),
        this.getMealsByCategory("Dessert"),
      ]);

      const randomBreakfast = breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)];
      const randomDessert = dessertMeals[Math.floor(Math.random() * dessertMeals.length)];

      selectedMeals.set(randomBreakfast.idMeal, randomBreakfast);
      selectedMeals.set(randomDessert.idMeal, randomDessert);

      const randomMeals = await Promise.all([
        this.getRandomMeal(),
        this.getRandomMeal(),
        this.getRandomMeal(),
        this.getRandomMeal()
      ]);

      for (const meal of randomMeals) {
        if (selectedMeals.size >= 4) break;
        if (!selectedMeals.has(meal.idMeal)) {
          selectedMeals.set(meal.idMeal, meal);
        }
      }

      let attempts = 0;
      const maxAttempts = 5;
      while (selectedMeals.size < 4 && attempts < maxAttempts) {
        const meal = await this.getRandomMeal();
        if (!selectedMeals.has(meal.idMeal)) {
          selectedMeals.set(meal.idMeal, meal);
        }
        attempts++;
      }

      if (selectedMeals.size < 4) {
        throw new Error("Unable to collect 4 unique meals after multiple attempts.");
      }

      return Array.from(selectedMeals.values());
    } catch (error) {
      console.error("Error fetching random meal plan:", error);
      throw error;
    }
  }
};

export default mealService;
