import { Keypair, PublicKey } from "@solana/web3.js";
import { env } from "../config/environment";
import { logger } from "../utils/logger";
import bs58 from "bs58";

export class WalletService {
  private wallet: Keypair;

  constructor() {
    this.wallet = this.loadWalletFromPrivateKey(env.solanaPrivateKey);
  }

  private loadWalletFromPrivateKey(privateKeyString: string): Keypair {
    try {
      // First try to decode as base58
      try {
        const decodedKey = bs58.decode(privateKeyString);
        return Keypair.fromSecretKey(decodedKey);
      } catch {
        // If base58 fails, try comma-separated format
        const privateKeyArray = new Uint8Array(
          privateKeyString.split(",").map((num) => parseInt(num.trim()))
        );
        return Keypair.fromSecretKey(privateKeyArray);
      }
    } catch (error) {
      logger.error("Failed to load wallet from private key", error);
      throw new Error(
        "Invalid private key format. Must be either base58 or comma-separated numbers"
      );
    }
  }

  public getPublicKey(): PublicKey {
    return this.wallet.publicKey;
  }

  public getWallet(): Keypair {
    return this.wallet;
  }
}
