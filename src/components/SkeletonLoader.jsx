import './SkeletonLoader.css';

const SkeletonLoader = ({ count = 4, type = "product-card" }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={`skeleton-loader ${type}`}>
                    {type === 'product-card' && (
                        <>
                            <div className="skeleton-image"></div>
                            <div className="skeleton-text skeleton-title"></div>
                            <div className="skeleton-text skeleton-subtitle"></div>
                            <div className="skeleton-text skeleton-price"></div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
