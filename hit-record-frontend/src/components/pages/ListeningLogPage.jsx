import { useNavigate } from "react-router";
import AlbumShelf from "../common/AlbumShelf";
import Card from "../common/Card";

const ListeningLogPage = ({ albumReviews, setExpandedAlbum }) => {

    const calculateAvg = (reviews) => {

        let sum = reviews.reduce((accumulator, reviews) => accumulator + reviews.rating.length, 0);

        let avg = (sum / reviews.length).toFixed(1);
        return avg;
    };

    let navigate = useNavigate();

    const albumDetailExpander = (album) => {
        setExpandedAlbum(album);
        navigate("/home/details");
    };

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
                            {albumReviews.length === 0 ? ("No average yet"): (`${calculateAvg(albumReviews)} stars`)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <AlbumShelf>
                {albumReviews && albumReviews.length > 0 ? (albumReviews.map((album) => {
                    return (
                        <Card className="album-card" onClick={() => albumDetailExpander(album)}>
                            <img src={album.image} alt={album.albumName} title={album.albumName} className="album-artwork"></img>
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
