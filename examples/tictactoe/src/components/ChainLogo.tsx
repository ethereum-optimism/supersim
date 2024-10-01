import React from 'react';

import opLogo from '../assets/op.png';
import modeLogo from '../assets/mode.png';

interface ChainLogoProps {
    chainId: bigint;
    size?: string;
}

const ChainLogo: React.FC<ChainLogoProps> = ({ chainId, size = '16px' }) => {
    const getLogoSrc = () => {
        switch (Number(chainId)) {
            case 901:
                return { src: opLogo, alt: "OP Mainnet" };
            case 902:
                return { src: modeLogo, alt: "Mode" };
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
