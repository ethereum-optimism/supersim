import { Address } from "viem";
import { useSwitchChain, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { useDeployment } from "./useDeployment";

import { CONTESTS_ABI } from "../constants/abi";
import { CONTESTS_CHAIN_ID } from "../constants/app";

export const useBuyOutcome = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const { deployment } = useDeployment()

    const buyOutcome = async (resolver: Address, outcome: number, amount: number) => {
        try {
            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({chainId: CONTESTS_CHAIN_ID});
            }

            await writeContract({
                address: deployment!.Contests,
                abi: CONTESTS_ABI, functionName: "buyOutcome", args: [resolver, outcome], value: BigInt(amount)
            })
        } catch (error) {
            console.error('Error buying outcome:', error)
            return { error }
        }
    }

    return { buyOutcome, isPending, isConfirming, isSuccess, hash }
}