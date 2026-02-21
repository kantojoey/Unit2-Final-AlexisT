import Button from "./Button";

const SearchBox = ({ accessToken, searchInput, setSearchInput, setAlbums }) => {
    const searchAlbum = async () => {

        if(!searchInput.trim()){
            return;
        };

        let albumParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await fetch(
                "https://api.spotify.com/v1/search?q=" +
                searchInput +
                "&limit=8&type=album",
                albumParams
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setAlbums(data.albums.items || []);
        } catch (error) {
            console.error("Failed to fetch albums:", error);
        }
    };
    
    return (
        <section className="album-search-section">
            <input type="text" value={searchInput} className="album-search-box" placeholder="Type album name here..."onChange={(e) => setSearchInput(e.target.value)} />
            <Button className="search-button" onClick={searchAlbum}>
                🔍
            </Button>
        </section>
    );
};

export default SearchBox;
