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
};

export default mealService;
