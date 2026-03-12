import { useState } from "react";
import Card from "../common/Card";
import VinylRecord from "../images/VinylRecord.png";
import ProfilePic from "../images/jiggly.jpg"
import AlbumShelf from "../common/AlbumShelf";
import SearchBox from "../common/SearchBox";
import Button from "../common/Button";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = ({ albumReviews, favorites, setFavorites, accessToken }) => {

    let [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState("");
    const { authUser } = useAuth();

    let emptyIndex = favorites.findIndex((index) => index === null);

    const handleAddFavorite = async (favorite) => {


        for (let i = 0; i < favorites.length; i++) {
            const albumAtIndex = favorites[i];

            if (albumAtIndex && albumAtIndex.spotifyAlbumId === favorite.id) {
                setError("This album already exists in your favorites!");
                return;
            }
        }

        if (emptyIndex === -1) {
            setError("Your favorites shelf is full! Please remove an album before adding a new selection.");
            return;
        };
        const requestBody = {
            spotifyAlbumId: favorite.id,
            title: favorite.name,
            artist: favorite.artists[0].name,
            imageUrl: favorite.images[0].url
        }

        const postParams = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody, null, 2)
        }
        try {
            const response = await fetch(`http://localhost:8080/favorites/user/${authUser.id}`, postParams);

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const addedAlbum = await response.json();


            setError("");
            let newFavorites = [...favorites];
            newFavorites[emptyIndex] = addedAlbum;
            setFavorites(newFavorites);

        } catch (error) {
            console.error("Error adding album, try again later:", error);
            setError("Error adding album, try again later.");

        }

    };

    const handleRemoveFavorite = async (index) => {
        let newFavorites = [...favorites];

        try {
            const response = await fetch(`http://localhost:8080/favorites/user/${authUser.id}/${favorites[index].id}`, { method: "DELETE" });

            if (!response.ok) throw new Error(`Failed to delete album: ${response.status}`);
        } catch (error) {
            console.error("Failed to remove album from favorites display:", error);
            setError("Failed to remove album, try again later.")
        }

        newFavorites[index] = null;
        setFavorites(newFavorites);
    };

    return (
        <main>
            <div className="user-profile-info">
                <h2 style={{ textAlign: "center" }}><strong>{authUser.username.toUpperCase()}</strong></h2>
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
                                <img src={album ? album.imageUrl : VinylRecord} alt={album ? album.name : "Vinyl record stock image"} title={album ? album.name : "Vinyl record stock image"} className="album-artwork" />
                            </Card>
                            {album ? (
                                <Button className={"remove-favorite"} onClick={() => handleRemoveFavorite(index)}>Remove</Button>
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
