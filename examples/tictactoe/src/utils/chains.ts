export enum Chain {
    UNKNOWN = 0,
    OP_MAINNET = 901,
    MODE = 902,
}

export const chain = (id: bigint): Chain => {
    switch (Number(id)) {
        case 901:
            return Chain.OP_MAINNET;
        case 902:
            return Chain.MODE;
        default:
            return Chain.UNKNOWN;
    }
}

export const chainName = (id: number): string => {
    switch (Number(id)) {
        case 901:
            return 'OP Mainnet';
        case 902:
            return 'Mode';
        default:
            return 'Unknown';
    }
}