const Card = ({children, className="", onClick}) => {
    return (
        <div className={`card-default-styles ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
