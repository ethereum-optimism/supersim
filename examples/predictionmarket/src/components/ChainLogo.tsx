import React from 'react';

import ink from '../assets/ink.png';
import op from '../assets/op.png';
import superpredict from '../assets/superpredict.png';

import { chainName } from '../utils/chain';

interface ChainLogoProps {
    chainId: bigint;
    size?: string;
}

const ChainLogo: React.FC<ChainLogoProps> = ({ chainId, size = '16px' }) => {
    const getLogoSrc = () => {
        switch (Number(chainId)) {
            case 901:
                return { src: op, alt: chainName(chainId) };
            case 902:
                return { src: ink, alt: chainName(chainId) };
            case 903:
                return { src: superpredict, alt: chainName(chainId) };
            default:
                return null;
        }
    };

    const logo = getLogoSrc();
    if (!logo) return null;

    return (
      <div style={styles.logoWrapper(size)}>
        <img src={logo.src} alt={logo.alt} style={styles.logo} />
      </div>
    );
}

const styles = {
    logoWrapper: (size: string) => ({
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain' as const,
    },
};

export default ChainLogo;
