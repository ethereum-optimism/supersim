import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useConfig } from 'wagmi';

import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';
import { getPublicClient } from 'wagmi/actions';

const contractNames = [
    // Referenced by the Prediction Market Contracts
    'TicTacToe',
    'BlockHashEmitter',

    // Prediction Market Contracts
    'PredictionMarket',
    'BlockHashMarketFactory',
    'TicTacToeMarketFactory'
]

export function useDeployment() {
    const [addresses, setAddresses] = useState<{ [key: string]: Address } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const config = useConfig()

    useEffect(() => {
        async function loadDeployments() {
            // Already Resolved
            if (addresses || error) return;

            try {
                // Fetch the run-latest.json file
                const data = await fetch('/run-latest.json');
                if (!data.ok) {
                    throw new Error('Failed to load deployment file');
                }

                // Look for the deployment on the prediction market chain.
                const run = await data.json();
                const deployment = run.deployments.find((deployment: any) => deployment.chain === PREDICTION_MARKET_CHAIN_ID)
                if (!deployment) {
                    throw new Error('No deployment found for prediction market chain');
                }
                
                const contracts = deployment.transactions
                    .filter((tx: any) => tx.transactionType === 'CREATE2')
                    .reduce((acc: { [key: string]: Address }, tx: any) => {
                        const envOverride = import.meta.env[`VITE_${tx.contractName}_ADDRESS`];
                        if (envOverride) {
                            console.log(`Using environment variable override for ${tx.contractName}: ${envOverride}`);
                        }

                        return { ...acc, [tx.contractName]: envOverride || tx.contractAddress };
                    }, {});

                console.log(`Required Contracts: [${contractNames.join(', ')}]`)
                console.log(`Parsed Deployment: ${JSON.stringify(contracts, null, 2)}`);

                // Check for missing or undefined addresses
                const missingContracts = contractNames.filter(name => !contracts[name]).map(name => name);
                if (missingContracts.length > 0) {
                    throw new Error(`Missing contracts in the latest run for: ${missingContracts.join(', ')}.\n
                    Rerun the deployment script & restart the vite server or set the VITE_<name>_ADDRESS environment variable`);
                }

                const client = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID })
                if (!client) {
                    throw new Error('failed to get client for prediction market chain')
                }

                await Promise.all(contractNames.map(async (name) => {
                    const address = contracts[name]
                    const code = await client.getCode({ address })
                    if (!code || code === '0x') throw new Error(`Required contract ${name} not deployed at ${address}`)
                }))

                setAddresses(contracts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load deployments');
            }
        }

        loadDeployments();
    }, [config]);

    return { deployment: addresses, error };
}