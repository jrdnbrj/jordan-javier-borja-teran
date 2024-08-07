import React from 'react';

const Skeleton = ({ width, height }) => {
    const style = {
        width: width || '100%',
        height: height || '1rem',
    };

    return <div className="skeleton" style={style}></div>;
};

export default Skeleton;
