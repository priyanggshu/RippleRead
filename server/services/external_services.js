import axios from "axios";

export const fetchExternalData = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://real-time-news-data.p.rapidapi.com/top-headlines",
      params: {
        limit: "500",
        country: "IN",
        lang: "en",
      },
      headers: {
        "x-rapidapi-key": "9f91d6b49cmsh484dde7cc301f44p139a86jsn2460d88fdeb8",
        "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    if(response.data && response.data.data) {
        return response.data.data || [];
    } else {
        console.error("Unexpected API response format:", response.data)
        return [];
    }
  } catch (error) {
    console.error("Error fetching external data:", error.message);
    return []; // Return empty array on failure
  }
};
