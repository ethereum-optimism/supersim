export const chainName = (chainId: bigint | number) => {
    switch (Number(chainId)) {
        case 901:
            return 'OP Mainnet';
        case 902:
            return 'Unichain';
        case 903:
            return 'SuperContests'
        default:
            return 'Unknown';
    }
}