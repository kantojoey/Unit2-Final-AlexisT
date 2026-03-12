import { useNavigate } from "react-router";
import AlbumShelf from "../common/AlbumShelf";
import Card from "../common/Card";
import VinylRecord from "../images/VinylRecord.png"

const ListeningLogPage = ({ albumReviews, setexpandedAlbumReview, setAlbumReviews }) => {

    let navigate = useNavigate();

    const calculateAvg = (reviews) => {

        let sum = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);

        let avg = (sum / reviews.length).toFixed(1);
        return avg;
    };


    const albumReviewExpander = (album) => {
        setexpandedAlbumReview(album);
        navigate("/home/details");
    };

    const sortReviews = (e) => {

        const option = e.target.value;

        // Avoids modifying original array
        const sorted = [...albumReviews];

        switch (option) {

            case "artistAscending":
                sorted.sort((a, b) => a.album.artist.localeCompare(b.album.artist));
                break;
            case "artistDescending":
                sorted.sort((a, b) => b.album.artist.localeCompare(a.album.artist));
                break;
            case "albumAscending":
                sorted.sort((a, b) => a.album.title.localeCompare(b.album.title));
                break;
            case "albumDescending":
                sorted.sort((a, b) => b.album.title.localeCompare(a.album.title));
                break;
            case "highToLow":
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case "lowToHigh":
                sorted.sort((a, b) => a.rating - b.rating);
                break;
            case "newestFirst":
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldestFirst":
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
                <option value="highToLow">Rating (High-Low)</option>
                <option value="lowToHigh">Rating(Low-High)</option>
                <option value="artistAscending">Artist (A-Z)</option>
                <option value="artistDescending">Artist (Z-A)</option>
                <option value="albumAscending">Title (A-Z)</option>
                <option value="albumDescending">Title (Z-A)</option>
            </select>
            <AlbumShelf>
                {albumReviews && albumReviews.length > 0 ? (albumReviews.map((post) => {
                    return (
                        <Card key={post.id} className="album-card" onClick={() => albumReviewExpander(post)}>
                            <img src={post.album.imageUrl || VinylRecord} alt={post.album.title} title={post.album.title} className="album-artwork"></img>
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
