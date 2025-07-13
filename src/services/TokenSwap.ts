import { SwapService } from "./SwapService";
import { UltraSwapRequest, UltraSwapResponse } from "../types/types";

const SOL_MINT = "So11111111111111111111111111111111111111112";

export class TokenSwap {
  static async swap(
    owner: string,
    inputAccount: string,
    outputAccount: string,
    amount: number
  ) {
    const inputMint = SOL_MINT;
    const outputMint = "Cngcf9cBRmdiY3nF6D95fHYdhDhQJNgLW6T71BTUpump";
    const taker = owner;
    const swapMode = "ExactIn";
    const ultraSwapRequest: UltraSwapRequest = {
      inputMint,
      outputMint,
      amount: amount.toString(),
      taker,
      swapMode,
    };
    const ultraSwapResponse: UltraSwapResponse | null =
      await SwapService.getUltraSwap(ultraSwapRequest);
    console.log("ultraSwapResponse", ultraSwapResponse);
    // return ultraSwapResponse;
  }
}
