import { config } from "dotenv";
import { Connection } from "@solana/web3.js";

// Load environment variables from .env file
config();

interface EnvironmentConfig {
  solanaPrivateKey: string;
  solanaRpcUrl: string;
  solanaConnection: Connection;
}

function validateEnvironment(): EnvironmentConfig {
  const privateKey = process.env.SOLANA_PRIVATE_KEY;
  const rpcUrl = process.env.SOLANA_RPC_URL;

  if (!privateKey) {
    throw new Error("SOLANA_PRIVATE_KEY is not set in environment variables");
  }

  if (!rpcUrl) {
    throw new Error("SOLANA_RPC_URL is not set in environment variables");
  }

  return {
    solanaPrivateKey: privateKey,
    solanaRpcUrl: rpcUrl,
    solanaConnection: new Connection(rpcUrl),
  };
}

export const env = validateEnvironment();
