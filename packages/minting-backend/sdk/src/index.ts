import { ImmutableConfiguration, ModuleConfiguration } from '@imtbl/config';
import { BlockchainData } from '@imtbl/blockchain-data';
import { ZkevmMintRequestUpdated, handle } from '@imtbl/webhook';
import { setEnvironment, setPublishableApiKey } from '@imtbl/metrics';
import { trackUncaughtException } from 'analytics';
import { mintingPersistence as mintingPersistencePg } from './persistence/pg/postgres';
import { mintingPersistence as mintingPersistencePrismaSqlite } from './persistence/prismaSqlite/sqlite';
import {
  submitMintingRequests, processMint, recordMint
} from './minting';
import { CreateMintRequest, MintingPersistence } from './persistence/type';
import { Logger } from './logger/type';

export {
  submitMintingRequests, processMint, recordMint,
  // database clients
  mintingPersistencePg, mintingPersistencePrismaSqlite
};

export interface MintingBackendModuleConfiguration
  extends ModuleConfiguration<undefined> {
  persistence: MintingPersistence;
  logger?: Logger;
}

const noopHandlers = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zkevmMintRequestUpdated: async (event: ZkevmMintRequestUpdated) => { }
};

export class MintingBackendModule {
  private readonly baseConfig: ImmutableConfiguration;

  private readonly persistence: MintingPersistence;

  private readonly blockchainDataClient: BlockchainData;

  private readonly logger: Logger;

  constructor(config: MintingBackendModuleConfiguration) {
    this.baseConfig = config.baseConfig;
    this.persistence = config.persistence;
    this.logger = config.logger || console;
    this.blockchainDataClient = new BlockchainData({
      baseConfig: config.baseConfig
    });

    setEnvironment(this.baseConfig.environment);
    if (this.baseConfig.publishableKey) {
      setPublishableApiKey(this.baseConfig.publishableKey);
    }
  }

  async recordMint(mintRequest: CreateMintRequest) {
    await recordMint(this.persistence, mintRequest);
  }

  async submitMintingRequests(config: {
    defaultBatchSize?: number;
    chainName?: string;
    maxNumberOfTries?: number;
  }) {
    await submitMintingRequests(
      this.persistence,
      this.blockchainDataClient,
      config
    );
  }

  async processMint(body: string | Record<string, unknown>, otherHandlers = noopHandlers) {
    await handle(body, this.baseConfig.environment, {
      zkevmMintRequestUpdated: async (event: ZkevmMintRequestUpdated) => {
        await processMint(this.persistence, event, this.logger);

        if (otherHandlers.zkevmMintRequestUpdated) {
          otherHandlers.zkevmMintRequestUpdated(event);
        }
      }
    });
  }
}

if (typeof process !== 'undefined' && process.on) {
  try {
    process.on('uncaughtExceptionMonitor', trackUncaughtException);
  } catch {
    // ignore
  }
}
