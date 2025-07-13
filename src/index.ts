import { DexScreenerClient } from "./services/DexScreenerClient";
import { TokenSwap } from "./services/TokenSwap";
import { WalletService } from "./services/WalletService";
import { logger } from "./utils/logger";
import { connectToDatabase } from "./config/mongoose";

async function main() {
  let dexScreener: DexScreenerClient | null = null;

  (async () => {
    await connectToDatabase();
  })();

  try {
    // Initialize wallet
    const walletService = new WalletService();
    logger.success(`Wallet loaded: ${walletService.getPublicKey().toString()}`);
    const solBalance = await walletService.getSolBalance();
    logger.info(`My Sol balance: ${solBalance}`);

    // Initialize and connect to DexScreener
    dexScreener = new DexScreenerClient();
    await dexScreener.connect();

    // await TokenSwap.swap(
    //   walletService.getPublicKey().toString(),
    //   "So11111111111111111111111111111111111111112",
    //   "Cngcf9cBRmdiY3nF6D95fHYdhDhQJNgLW6T71BTUpump",
    //   1000000000
    // );
    // Handle application shutdown
    process.on("SIGINT", async () => {
      logger.info("Shutting down...");
      if (dexScreener) {
        await dexScreener.disconnect();
      }
      process.exit(0);
    });
  } catch (error) {
    logger.error("Application error:", error);
    if (dexScreener) {
      await dexScreener.disconnect();
    }
    process.exit(1);
  }
}

main();
