import axios from "axios";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

const API_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async (): Promise<Coin[]> => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return [];
  }
};
