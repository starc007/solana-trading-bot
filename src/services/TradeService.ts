import { Trade, ITrade } from "../models/Trade";

export class TradeService {
  static async saveTrade(tradeData: Partial<ITrade>): Promise<ITrade> {
    const trade = new Trade(tradeData);
    return await trade.save();
  }

  static async getTrades(filter = {}, limit = 100): Promise<ITrade[]> {
    return Trade.find(filter).sort({ timestamp: -1 }).limit(limit).exec();
  }

  static async getTradeByTokenAddress(
    tokenAddress: string,
    limit = 100
  ): Promise<ITrade[]> {
    return Trade.find({ tokenAddress })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();
  }
}
