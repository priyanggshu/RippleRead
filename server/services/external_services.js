import axios from "axios";
import { redisClient } from "../server.js";

export const fetchExternalData = async () => {
  const cacheKey = "news_data";

  try {
    // check redis cache first
    const cacheData = await redisClient.get(cacheKey);
    if (cacheData) {
      console.log("Serving data from cache");
      return JSON.parse(cacheData);
    }

    const response = await axios.get(process.env.MAIN_API);

    if (response.data?.results) {
      // Store in Redis with expiration time (10 min)
      await redisClient.setEx( cacheKey, 600, JSON.stringify(response.data.results));
      console.log(`Fetched ${response.data.results.length} fresh news articles from API`);
      return response.data.results;
    } else {
      console.error("Unexpected API response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching external data:", error.message);
    return []; // Return empty array on failure
  }
};
