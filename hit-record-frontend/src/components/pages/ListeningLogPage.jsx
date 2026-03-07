import { useNavigate } from "react-router";
import AlbumShelf from "../common/AlbumShelf";
import Card from "../common/Card";

const ListeningLogPage = ({ albumReviews, setexpandedAlbumReview, setAlbumReviews }) => {

    const calculateAvg = (reviews) => {

        let sum = reviews.reduce((accumulator, reviews) => accumulator + reviews.rating.length, 0);

        let avg = (sum / reviews.length).toFixed(1);
        return avg;
    };

    let navigate = useNavigate();

    const albumDetailExpander = (album) => {
        setexpandedAlbumReview(album);
        navigate("/home/details");
    };

    const sortReviews = (event) => {

        const option = event.target.value;

        const sorted = [...albumReviews];

        switch(option) {

        case "artistAscending":
            sorted.sort((a,b) => a.album.artist.localeCompare(b.album.artist));
            break;
        case "artistDescending":
            sorted.sort((a,b) => b.album.artist.localeCompare(a.album.artist));
            break;
        case "albumAscending":
            sorted.sort((a,b) => a.album.title.localeCompare(b.album.title)); 
            break;  
        case "albumDescending":
            sorted.sort((a,b) => b.album.title.localeCompare(a.album.title)); 
            break;  
        case "highToLow":
            sorted.sort((a,b) => b.rating.length - a.rating.length);
            break;
        case "lowToHigh":
            sorted.sort((a,b) => a.rating.length - b.rating.length);
            break;
        case "newestFirst":
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case "oldestFirst":
            sorted.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setAlbumReviews(sorted);
    }

    return (
        <main>
            <h1><strong>My Listening Log</strong></h1>
            <table className="listening-stats-table">
                <tbody>
                    <tr>
                        <th>Total Reviews</th>
                        <td>
                            {albumReviews.length === 1 ? ("1 review") : (`${albumReviews.length} reviews`)}
                        </td>
                    </tr>
                    <tr>
                        <th>Average Rating</th>
                        <td>
                            {albumReviews.length === 0 ? ("No average yet") : (`${calculateAvg(albumReviews)} stars`)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <select
                id="review-sorting-selector"
                name="sorter"
                defaultValue={""}
                onChange={sortReviews}
            >
                <option value="" disabled hidden>Sort your reviews</option>
                <option value="newestFirst">Newest Reviews First</option>
                <option value="oldestFirst">Oldest Reviews First</option>
                <option value="highToLow">Rating (High - Low)</option>
                <option value="lowToHigh">Rating(Low-High)</option>
                <option value="artistAscending">Artist (A-Z)</option>
                <option value="artistDescending">Artizt (Z-A)</option>
                <option value="albumAscending">Title (A-Z)</option>
                <option value="albumDescending">Title (Z-A)</option>
            </select>
            <AlbumShelf>
                {albumReviews && albumReviews.length > 0 ? (albumReviews.map((album) => {
                    return (
                        <Card key={album.id} className="album-card" onClick={() => albumDetailExpander(album)}>
                            <img src={album.image} alt={album.title} title={album.title} className="album-artwork"></img>
                        </Card>
                    )
                })) :
                    (<p>Nothing to show here yet...</p>)
                }
            </AlbumShelf>
        </main>
    );
};

export default ListeningLogPage;
