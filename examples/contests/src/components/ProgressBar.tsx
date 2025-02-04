import React from 'react';

interface ProgressBarProps {
    width: string;
    height: string;
    progress: number;

    yesColor?: string;
    noColor?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ width, height, progress, yesColor = '#22C55E', noColor = '#FF0420' }) => {
    return (
        <div style={{
            display: 'flex',
            position: 'relative',
            width: `${width}`, height: `${height}`,
            alignItems: 'center', justifyContent: 'center'
        }}>
            <svg width={width} height={height} viewBox="0 0 80 45">
                <text x="40" y="35" textAnchor="middle" style={{fontSize: '18px', lineHeight: '28px'}}>{(progress * 100).toFixed(0)}%</text>
                <path d="M 5 40 A 35 35 0 1 1 75 40" fill="none" stroke="#E0E0E0" strokeWidth="5" />
                <path
                    d="M 5 40 A 35 35 0 1 1 75 40"
                    fill="none"
                    stroke={progress > .5 ? yesColor : noColor}
                    strokeWidth="5"
                    strokeDasharray={`${Math.PI * 35}`}
                    strokeDashoffset={`${Math.PI * 35 * (1 - progress)}`}
                />
            </svg>
        </div>
    )
}

export default ProgressBar;