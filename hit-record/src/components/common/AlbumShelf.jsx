const AlbumShelf = ({children, className = ""}) => {
    return (
        <div className={`album-shelf-default-styles ${className}`}>
            {children}
        </div>
    );
};

export default AlbumShelf;
