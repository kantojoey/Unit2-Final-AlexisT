const Button = ({children, className = "", onClick}) => {
    return (
        <button className={`button-default-styles ${className}`} onClick={onClick} >
            {children}   
        </button>
    );
};

export default Button;
