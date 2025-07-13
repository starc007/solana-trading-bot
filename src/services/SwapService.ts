import axios from "axios";
import { QuoteResponse, SwapRequest, SwapResponse } from "../types/types";
import { QuoteRequest } from "../types/types";

export class JupiterService {
  private static readonly QUOTE_API = "https://quote-api.jup.ag/v6/quote";
  private static readonly SWAP_API = "https://quote-api.jup.ag/v6/swap";

  static async getQuote(params: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await axios.get(this.QUOTE_API, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getSwap(data: SwapRequest): Promise<SwapResponse> {
    try {
      const response = await axios.post(this.SWAP_API, data, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTokenPrices(mint: string[]) {
    const url = `https://api-v3.raydium.io/mint/price?mints=${mint.join(",")}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
