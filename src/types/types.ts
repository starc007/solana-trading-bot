export interface QuoteRequest {
  inputMint: string;
  outputMint: string;
  amount: string;
  swapMode?: "ExactIn" | "ExactOut";
  slippageBps?: string;
}

export interface SwapInfo {
  ammKey: string;
  label?: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

export interface RoutePlan {
  swapInfo: SwapInfo;
  percent: number;
}

export interface QuoteResponse {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode?: "ExactIn" | "ExactOut";
  slippageBps: number;
  priceImpactPct: string;
  routePlan: RoutePlan[];
  contextSlot?: number;
  timeTaken?: number;
  swapUsdValue?: string;
}

export interface SwapRequest {
  userPublicKey: string;
  quoteResponse: QuoteResponse;
  wrapAndUnwrapSol?: boolean;
  useSharedAccounts?: boolean;
  feeAccount?: string;
  computeUnitPriceMicroLamports?: number;
  asLegacyTransaction?: boolean;
  dynamicSlippage?: {
    maxBps?: number;
  };
  prioritizationFeeLamports?: {
    priorityLevelWithMaxLamports: {
      maxLamports: number;
      priorityLevel: "veryHigh" | "high" | "medium" | "low";
    };
  };
}

export interface SwapResponse {
  lastValidBlockHeight: number;
  swapTransaction: string;
  prioritizationFeeLamports?: {
    priorityLevelWithMaxLamports: {
      maxLamports: number;
      priorityLevel: "veryHigh" | "high" | "medium" | "low";
    };
  };
}
