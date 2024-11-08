export const chainName = (chainId: bigint | number) => {
    switch (Number(chainId)) {
        case 901:
            return 'SuperPredictor'
        case 902:
            return 'Ink';
        case 903:
            return 'OPM';
        default:
            return 'Unknown';
    }
}