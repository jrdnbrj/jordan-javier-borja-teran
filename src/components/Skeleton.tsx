interface SkeletonProps {
    width: string;
    height: string;
}

const Skeleton = ({ width, height }: SkeletonProps) => {
    const style = {
        width: width || '100%',
        height: height || '1rem',
    };

    return <div className="skeleton" style={style}></div>;
};

export default Skeleton;
