import { Link, useNavigate } from "react-router";
import Card from "../../common/Card";
import Button from "../../common/Button";
import VinylRecord from "../../images/VinylRecord.png"

const ExpandedDetailsPage = ({ expandedAlbumReview, setAlbumReviews }) => {

    let navigate = useNavigate();

    const editPost = () => {

        // Passes in the postID generated in backend
        // Passes state of the full album review object to "post" and sends to review page
        navigate(`/search/review/${expandedAlbumReview.id}`, { state: { post: expandedAlbumReview } });

    };

    const renderStars = () => {
        return "★".repeat(expandedAlbumReview.rating);
    }

    const deletePost = async () => {

        const confirmDelete = window.confirm("Are you sure you want to delete this post? This cannot be undone.");

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/posts/${expandedAlbumReview.id}`, { method: "DELETE" })

            if (!response.ok) {
                throw new Error(`Delete failed!: ${response.status}`);
            }

            // Logic to delete from front end
            // Filters out the matching post ID from URL parameter
            setAlbumReviews(prev =>
                prev.filter(review => review.id !== expandedAlbumReview.id)
            );

            navigate("/listening-log");

        } catch (error) {
            console.error("Failed to delete review:", error);
        };
    }


    return (
        <main>
            {expandedAlbumReview ? (
                <>
                    <span style={{ display: "flex", flexDirection: "row", gap: "10px" }}>

                        <Link to="/home" style={{ color: "white" }}>
                            <h3 style={{ textDecoration: "underline" }}>Home</h3>
                        </Link>
                        <p>__</p>
                        <Link to="/listening-log" style={{ color: "white" }}>
                            <h3 style={{ textDecoration: "underline" }}>Listening Log</h3>
                        </Link>
                    </span>
                    <div className="expanded-album-details-page">
                        <Card className="album-card">
                            <img src={expandedAlbumReview.album.imageUrl || VinylRecord} alt={expandedAlbumReview.album.title} title={expandedAlbumReview.album.title} className="album-artwork" style={{ cursor: "auto" }}></img>
                        </Card>
                        <h2><span className="data-category">Rating:</span> {renderStars()}</h2>
                    </div>
                    <div className="expanded-album-review-content">
                        <Card className="key-album-data">
                            <Card className="album-datapoint-card">
                                <h3 className="data-heading"><span className="data-category">Title:</span> {expandedAlbumReview.album.title}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading"><span className="data-category">Artist:</span> {expandedAlbumReview.album.artist}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading"><span className="data-category">Year:</span> {expandedAlbumReview.album.yearReleased}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading">{expandedAlbumReview.album.numberOfTracks} <span className="data-category">tracks</span></h3>
                            </Card>
                        </Card>
                        <Card className="user-review-card">
                            <h3 className="data-category">My Review:</h3>
                            <p>
                                {expandedAlbumReview.reviewText}
                            </p>
                        </Card>
                    </div>
                    <div className="edit-post-options">
                        <Button className="delete-post-button" onClick={deletePost}>
                            Delete
                        </Button>
                        <Button className="edit-post-button" onClick={editPost}>
                            Edit
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/home" style={{ color: "white" }}>
                        <h2 style={{ textDecoration: "underline" }}>←Back to home</h2>
                    </Link>
                    <p style={{ textAlign: "justify", fontSize: "2rem" }}>Nothing to see here yet. Try logging an album for review to see details.</p>
                </>
            )
            }

        </main>
    );
};

export default ExpandedDetailsPage;
