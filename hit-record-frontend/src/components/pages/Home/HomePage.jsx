import { Link, useNavigate } from "react-router";
import AlbumShelf from "../../common/AlbumShelf";
import Card from "../../common/Card";
import VinylRecord from "../../images/VinylRecord.png"
import { useAuth } from "../../contexts/AuthContext";

const HomePage = ({ albumReviews, setexpandedAlbumReview, favorites }) => {

    // Access to logged in user
    const { authUser } = useAuth();

    let navigate = useNavigate();

    // Sets the value to the album represented by the card that is clicked on UI
    const albumReviewExpander = (album) => {
        setexpandedAlbumReview(album);
        navigate("/home/details");

    };

    return (
        <main>
            <h3><i>Welcome to your music homepage, {authUser.username}! Let's get listening.</i></h3>
            <h1><strong>My Favorites at a glance</strong></h1>
            <AlbumShelf className="favorites-display">
                {favorites.map((album, index) => {
                    return (
                        <div key={index}>
                            <Card className="album-card-no-pointer">
                                <img src={album ? album.imageUrl : VinylRecord} alt={album ? album.title : "Vinyl record stock image"} title={album ? album.title : "Vinyl record stock image"} className="album-artwork" />
                            </Card>
                        </div>
                    )
                })}
            </AlbumShelf>
            <Link to="/listening-log" style={{ color: "white" }}>
                <h1>Recently Listened →</h1>
            </Link>
            <AlbumShelf>
                {albumReviews && albumReviews.length > 0 ? (albumReviews.slice(0, 8).map((post) => {
                    return (
                        <Card key={post.id} className="album-card" onClick={() => albumReviewExpander(post)}>
                            <img src={post.album.imageUrl || VinylRecord} className="album-artwork" alt={post.album.title} title={post.album.title}></img>
                        </Card>
                    )
                })) :
                    (<p>Nothing to show here yet...</p>)
                }
            </AlbumShelf>
        </main>
    );
};

export default HomePage;
