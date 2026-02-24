import './Preloader.css';

const Preloader = ({ isFadingOut }) => {
    return (
        <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="preloader-content">
                <img 
                    src={`${import.meta.env.BASE_URL}logo.png`} 
                    alt="Drupa Dietética" 
                    className="preloader-logo" 
                />
                <h1 className="preloader-text">Drupa</h1>
            </div>
        </div>
    );
};

export default Preloader;
