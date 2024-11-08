export const chainName = (chainId: bigint | number) => {
    switch (Number(chainId)) {
        case 901:
            return 'OPM'
        case 902:
            return 'Ink';
        case 903:
            return 'SuperPredictor'
        default:
            return 'Unknown';
    }
}