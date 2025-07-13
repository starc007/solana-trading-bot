import { SwapService } from "./SwapService";
import { UltraSwapRequest, UltraSwapResponse } from "../types/types";
import { PositionService } from "./PositionService";

const USDC_MINT = "USDC_MINT_ADDRESS"; // Replace with actual USDC mint address

export class TokenSwap {
  static async buyToken(
    owner: string,
    inputAccount: string,
    outputAccount: string,
    amount: number,
    tokenInfo: {
      name: string;
      symbol: string;
      decimals: number;
      logoURI: string;
      mcap: number;
      address: string;
    }
  ) {
    const inputMint = USDC_MINT;
    const outputMint = tokenInfo.address;
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
    if (ultraSwapResponse) {
      // Open a position
      await PositionService.openPosition({
        tokenAddress: outputMint,
        tokenInfo: {
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          decimals: tokenInfo.decimals,
          logoURI: tokenInfo.logoURI,
          mcap: tokenInfo.mcap,
        },
        amount: Number(ultraSwapResponse.outAmount),
        avgBuyPrice:
          ultraSwapResponse.inUsdValue / Number(ultraSwapResponse.outAmount),
        status: "open",
        openTimestamp: new Date(),
      });
    }
    return ultraSwapResponse;
  }

  static async sellToken(
    owner: string,
    inputAccount: string,
    outputAccount: string,
    amount: number,
    positionId: string,
    tokenInfo: {
      name: string;
      symbol: string;
      decimals: number;
      logoURI: string;
      mcap: number;
      address: string;
    },
    avgBuyPrice: number
  ) {
    const inputMint = tokenInfo.address;
    const outputMint = USDC_MINT;
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
    if (ultraSwapResponse) {
      // Calculate PnL
      const sellPrice =
        ultraSwapResponse.outUsdValue / Number(ultraSwapResponse.inAmount);
      const pnl = PositionService.calculatePnL(avgBuyPrice, sellPrice);
      // Close the position
      await PositionService.closePosition(positionId, pnl, sellPrice);
    }
    return ultraSwapResponse;
  }
}
