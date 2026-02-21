import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBox from "../../common/SearchBox";
import Card from "../../common/Card";
import Button from "../../common/Button";



const SearchPage = ({ accessToken, setReviewedAlbum }) => {

    const [searchInput, setSearchInput] = useState("");

    const [albums, setAlbums] = useState([]);


    let navigate = useNavigate();

    const handleLogAlbum = (album) => {
        setReviewedAlbum(album);
        navigate("/search/review");
    };

    return (
        <main>
            <h1>Search for an album:</h1>
            <SearchBox accessToken={accessToken} searchInput={searchInput} setSearchInput={setSearchInput} albums={albums} setAlbums={setAlbums} />
            {albums.length > 0 &&
                <h1>Search results...</h1>
            }
            <section className="search-results-section">
                {albums.map((album) => {
                    return (
                        <div key={album.id}>
                            <Card className="album-card-no-pointer">
                                <img src={album.images[0].url} alt={album.name} title={album.name} className="album-artwork"></img>
                                <h3>{album.name}</h3>
                            </Card>
                            <Button className="add-album-button" onClick={() => handleLogAlbum(album)}> + Log Album
                            </Button>
                        </div>
                    )
                })}
            </section>
        </main>
    );
};

export default SearchPage;