import React from 'react';

interface LogoCircleProps {
    imageUrl: string;
}

const LogoCircle: React.FC<LogoCircleProps> = ({ imageUrl }) => {
    return (
        <div className="logo-circle">
            <img src={imageUrl} alt="Logo" />
        </div>
    );
};

export default LogoCircle;
