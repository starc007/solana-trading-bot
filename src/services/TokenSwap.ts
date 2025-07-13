import { PublicKey } from "@solana/web3.js";
import { JupiterService } from "./SwapService";
import { QuoteRequest, SwapRequest } from "../types/types";

const SOL_MINT = "So11111111111111111111111111111111111111112";

export class TokenSwap {
  static async swap(
    owner: string,
    inputAccount: string,
    outputAccount: string,
    amount: number
  ) {
    const quoteRequest: QuoteRequest = {
      inputMint: "So11111111111111111111111111111111111111112",
      outputMint: "Cngcf9cBRmdiY3nF6D95fHYdhDhQJNgLW6T71BTUpump",
      amount: amount.toString(),
      swapMode: "ExactIn",
    };
    const quoteResponse = await JupiterService.getQuote(quoteRequest);
    console.log("quoteResponse", quoteResponse);
    const swapRequest: SwapRequest = {
      userPublicKey: owner,
      quoteResponse: quoteResponse,
      computeUnitPriceMicroLamports: 195000,
      dynamicSlippage: {
        maxBps: 1000,
      },
    };
    const swapResponse = await JupiterService.getSwap(swapRequest);
    console.log("swapResponse", swapResponse);
    // return swap;
  }
}
