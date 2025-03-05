import axios from "axios";
import { redisClient } from "../server.js";

export const fetchExternalData = async () => {
  const cacheKey = "news_data";

  try {
    const cacheData = await redisClient.get(cacheKey);
    if (cacheData) {
      console.log("Serving data from cache");
      return JSON.parse(cacheData);
    }

    const response = await axios.get("https://api.mediastack.com/news", { 
      params: {
        access_key: process.env.MEDIASTACK_API_KEY, 
        country: "in" 
      },
    });
    response = JSON.stringify(response)
    console.log(`response: ${response.data}`)

    if (response.data?.data) {
      await redisClient.setEx(
        cacheKey,
        600,
        JSON.stringify(response.data.data)
      );
      return response.data.data || [];
    } else {
      console.error("Unexpected API response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching external data:", error.message);
    return []; // Return empty array on failure
  }
};
