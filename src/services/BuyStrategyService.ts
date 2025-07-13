import { TokenService } from "./TokenService";
import { PositionService } from "./PositionService";
import { TokenSwap } from "./TokenSwap";
import { logger } from "../utils/logger";

export class BuyStrategyService {
  static async run(owner: string, inputAccount: string) {
    // 1. Get tokens from DB with required filters
    const tokens = await TokenService.getAllTokens(
      {
        liquidity: { $gt: 20000 },
        mcap: { $gt: 50000, $lt: 5000000 },
      },
      20
    );

    const now = Date.now();
    const oneHourMs = 60 * 60 * 1000;
    const eligibleTokens = tokens.filter((token) => {
      if (!token.createdAt) return false;
      const createdAtTime = new Date(token.createdAt).getTime();
      // Only tokens created within the last hour
      if (now - createdAtTime > oneHourMs) return false;
      return true;
    });

    logger.info(`Eligible tokens for buying: ${eligibleTokens.length}`);

    const maxPerToken = 30; // $30 per token
    let openPositions = 0;
    const maxPositions = 3;

    for (const token of eligibleTokens) {
      if (openPositions >= maxPositions) break;
      // Check if already have a position in this token
      const position = await PositionService.getOpenPositions();
      if (position.find((p) => p.tokenAddress === token.address)) continue;
      // Buy logic
      logger.info(
        `Buying $${maxPerToken} of ${token.symbol} (${token.address})`
      );
      await TokenSwap.buyToken(
        owner,
        inputAccount,
        token.address,
        maxPerToken,
        {
          name: token.name || token.symbol,
          symbol: token.symbol,
          decimals: token.decimals || 6,
          logoURI: token.logoURI || "",
          mcap: token.mcap || 0,
          address: token.address,
        }
      );
      openPositions++;
    }
    logger.info(
      `Buy strategy completed. Opened ${openPositions} new positions.`
    );
  }
}
