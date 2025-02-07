import { DexScreenerClient } from "./services/DexScreenerClient";
import { WalletService } from "./services/WalletService";
import { logger } from "./utils/logger";

async function main() {
  let dexScreener: DexScreenerClient | null = null;

  try {
    // Initialize wallet
    const walletService = new WalletService();
    logger.success(`Wallet loaded: ${walletService.getPublicKey().toString()}`);

    // Initialize and connect to DexScreener
    dexScreener = new DexScreenerClient();
    await dexScreener.connect();

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
