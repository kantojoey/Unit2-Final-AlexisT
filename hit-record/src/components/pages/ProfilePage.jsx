import { useState } from "react";
import Card from "../common/Card";
import VinylRecord from "../images/VinylRecord.png";
import ProfilePic from "../images/ProfilePic.jpg"
import AlbumShelf from "../common/AlbumShelf";
import SearchBox from "../common/SearchBox";
import Button from "../common/Button";

const ProfilePage = ({ albumReviews, favorites, setFavorites, accessToken }) => {

    let [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState("");

    let emptyIndex = favorites.findIndex((index) => index === null);

    const handleAddFavorite = (favorite) => {

        if (favorites.includes(favorite)) {
            setError("This album already exists in your favorites!");
            return;
        };

        if (emptyIndex === -1) {
            setError("Your favorites shelf is full! Please remove an album before adding a new selection.");
            return;
        };

        setError("");
        let newFavorites = [...favorites];
        newFavorites[emptyIndex] = favorite;
        setFavorites(newFavorites);
    };

    const handleRemoveFavorite = (favorite) => {
        let newFavorites = [...favorites];
        newFavorites[favorite] = null;
        setFavorites(newFavorites);
    };

    return (
        <main>
            <div className="user-profile-info">
                <h2 style={{ textAlign: "center" }}><strong>My Profile</strong></h2>
                <div className="profile-pic-div">
                    <img className="profile-pic" src={ProfilePic} />
                    <Card className="profile-stat">
                        <h2>{albumReviews.length === 1 ? (`${albumReviews.length} review`) : (`${albumReviews.length} reviews`)}</h2>
                    </Card>
                </div>
            </div>
            <AlbumShelf className="favorites-display">
                {favorites.map((album, index) => {
                    return (
                        <div key={index}>
                            <Card className="album-card-no-pointer">
                                <img src={album ? album.images[0].url : VinylRecord} alt={album ? album.name : "Vinyl record stock image"}  title={album ? album.name : "Vinyl record stock image"} className="album-artwork" />
                            </Card>
                            {album ? (
                                <Button onClick={() => handleRemoveFavorite(index)}>Remove</Button>
                            ) : <></>}
                        </div>
                    )
                })}
            </AlbumShelf>
            <h1>Search for an album:</h1>
            <SearchBox accessToken={accessToken} searchInput={searchInput} setSearchInput={setSearchInput} setAlbums={setAlbums} placeholder="Type album name here..." />
            {albums.length > 0 &&
                <h1>Search results...</h1>
            }
            {error && <h2>{error}</h2>}
            <section className="search-results-section">
                {albums.map((album) => {
                    return (
                        <div key={album.id}>
                            <Card className="album-card-no-pointer">
                                <img src={album.images[0].url} alt={album.name} title={album.name} className="album-artwork"></img>
                                <h3>{album.name}</h3>
                            </Card>
                            <Button className="add-album-button" onClick={() => handleAddFavorite(album)}> + Add Favorite
                            </Button>
                        </div>
                    )
                })}
            </section>

        </main>
    );
};

export default ProfilePage;
