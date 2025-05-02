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
};

export default mealService;
